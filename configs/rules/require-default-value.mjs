import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://wiki.yandex.ru/product/platform-front-web/linting/${name}`
);

const rule = createRule({
  name: 'require-default-value',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure @Input decorated properties have @DefaultValue decorator unless they are marked as required',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingDefaultValue: '@Input properties must have @DefaultValue decorator unless they are marked as required',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        node.body.body.forEach(member => {
          if (member.type === 'PropertyDefinition' && member.decorators) {
            const inputDecorator = member.decorators.find(
              d => d.expression.type === 'CallExpression' && d.expression.callee?.name === 'Input'
            );

            if (inputDecorator) {
              const isRequired = inputDecorator.expression.arguments.length > 0 &&
                inputDecorator.expression.arguments[0].type === 'ObjectExpression' &&
                inputDecorator.expression.arguments[0].properties.some(
                  prop => 
                    prop.key.name === 'required' && 
                    prop.value.type === 'Literal' && 
                    prop.value.value === true
                );

              if (!isRequired) {
                const hasDefaultValue = member.decorators.some(
                  d => d.expression.type === 'CallExpression' && d.expression.callee?.name === 'DefaultValue'
                );

                if (!hasDefaultValue) {
                  context.report({
                    node: member,
                    messageId: 'missingDefaultValue',
                  });
                }
              }
            }
          }
        });
      }
    };
  },
});

export default rule;