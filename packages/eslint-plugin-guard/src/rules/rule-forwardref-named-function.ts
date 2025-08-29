import { ESLintUtils } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/types";

type MessageIds =
    | "mustBeNamedFunction"
    | "noArrowFunctionInsideForwardRef"
    | "noAnonymousFunctionInsideForwardRef";

export default ESLintUtils.RuleCreator(() => "https://github.com/")<
    [],
    MessageIds
>({
    name: "forward-ref-named-function",
    meta: {
        type: "suggestion",
        docs: {
            description:
                "Only allow React.forwardRef components that wrap a normal named function. Disallow arrow/anonymous functions.",
        },
        messages: {
            mustBeNamedFunction:
                "React.forwardRef must wrap a normal named function declaration.",
            noArrowFunctionInsideForwardRef:
                "Arrow functions are not allowed inside React.forwardRef.",
            noAnonymousFunctionInsideForwardRef:
                "Anonymous functions are not allowed inside React.forwardRef.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        function isReactForwardRef(callee: TSESTree.Expression): boolean {
            if (callee.type === "MemberExpression" && !callee.computed) {
                const object = callee.object as
                    | TSESTree.Identifier
                    | TSESTree.MemberExpression;
                const property = callee.property as TSESTree.Identifier;
                return (
                    (((object as TSESTree.Identifier).type === "Identifier" &&
                        (object as TSESTree.Identifier).name === "React") ||
                        (object.type === "MemberExpression" &&
                            (object.property as TSESTree.Identifier).name ===
                                "default")) &&
                    property.name === "forwardRef"
                );
            }
            if (callee.type === "Identifier") {
                return callee.name === "forwardRef";
            }
            return false;
        }

        return {
            CallExpression(node) {
                if (!isReactForwardRef(node.callee)) return;
                const firstArg = node.arguments[0] as TSESTree.Node | undefined;
                if (!firstArg) return;

                if (firstArg.type === "ArrowFunctionExpression") {
                    context.report({
                        node: firstArg,
                        messageId: "noArrowFunctionInsideForwardRef",
                    });
                    return;
                }

                if (firstArg.type === "FunctionExpression") {
                    if (!firstArg.id) {
                        context.report({
                            node: firstArg,
                            messageId: "noAnonymousFunctionInsideForwardRef",
                        });
                        return;
                    }
                    // Named function expression is allowed, but enforce normal function declaration instead.
                    context.report({
                        node: firstArg,
                        messageId: "mustBeNamedFunction",
                    });
                    return;
                }

                if (firstArg.type === "Identifier") {
                    const variable = context.sourceCode
                        .getScope(firstArg)
                        .set.get(firstArg.name);
                    const def = variable?.defs[0];
                    if (def && def.node.type === "FunctionDeclaration") {
                        // OK: forwardRef(FunctionDeclarationName)
                        return;
                    }
                    if (def && def.node.type === "VariableDeclarator") {
                        const init = def.node
                            .init as TSESTree.Expression | null;
                        if (init && init.type === "ArrowFunctionExpression") {
                            context.report({
                                node: firstArg,
                                messageId: "noArrowFunctionInsideForwardRef",
                            });
                            return;
                        }
                        if (
                            init &&
                            init.type === "FunctionExpression" &&
                            !init.id
                        ) {
                            context.report({
                                node: firstArg,
                                messageId:
                                    "noAnonymousFunctionInsideForwardRef",
                            });
                            return;
                        }
                        if (
                            init &&
                            init.type === "FunctionExpression" &&
                            init.id
                        ) {
                            context.report({
                                node: firstArg,
                                messageId: "mustBeNamedFunction",
                            });
                            return;
                        }
                    }
                    // If not resolvable, do nothing.
                    return;
                }

                // If it is not a function reference or declaration, flag it.
                context.report({
                    node: firstArg,
                    messageId: "mustBeNamedFunction",
                });
            },
        };
    },
});
