import { ESLintUtils } from "@typescript-eslint/utils";

type MessageIds = "noDefaultExportInComponents";

export default ESLintUtils.RuleCreator(() => "https://github.com/")<
  [],
  MessageIds
>({
  name: "no-default-export-in-components",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow default exports under components/ folder.",
    },
    messages: {
      noDefaultExportInComponents:
        "Default exports are not allowed in files under components/.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();
    const isInComponents = /(?:^|\/)components\//.test(
      filename.replace(/\\/g, "/")
    );
    if (!isInComponents) {
      return {};
    }
    return {
      ExportDefaultDeclaration(node) {
        context.report({ node, messageId: "noDefaultExportInComponents" });
      },
    };
  },
});
