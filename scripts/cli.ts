#!/usr/bin/env ts-node-script

import { mkdirSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

interface TemplateFn {
  (name: string): string;
}

const { floor, random } = Math;

const componentTpl: TemplateFn = (name) => `\
import React, { FC } from 'react';
import style from './${name}.module.css';

export const ${name}: FC = () => <div className={style.${name}}>${name}</div>;
`;

const styleTpl: TemplateFn = (name) => `\
.${name} {
  background: hsl(${floor(random() * 360)}, 80%, 50%);
}
`;

const testTpl: TemplateFn = (name) => `\
import React from 'react';
import { render } from '@testing-library/react';
import { ${name} } from './${name}';

test('renders ${name}', () => {
  const { getByText } = render(<${name} />);
  const text = getByText(/${name}/i);
  expect(text).toBeInTheDocument();
});
`;

const indexTpl: TemplateFn = (name) => `\
export { ${name} } from './${name}';
`;

const generate = (name: string) =>
  [
    [`${name}.tsx`, componentTpl(name)],
    [`${name}.module.css`, styleTpl(name)],
    [`${name}.test.tsx`, testTpl(name)],
    ['index.ts', indexTpl(name)],
  ].forEach(([base, contents]) => {
    const path = join(process.cwd(), 'src', 'components', name, base);
    const { dir } = parse(path);

    mkdirSync(dir, { recursive: true });
    writeFileSync(path, contents);
  });

const [, , componentName] = process.argv;
generate(componentName);
