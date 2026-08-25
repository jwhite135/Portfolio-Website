import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';

interface PageHeaderProps {
  /** Java class name rendered in the syntax-highlighted heading. */
  className_: string;
  /** Accessible page title — what the heading actually says, unstyled. */
  title: string;
  /** Sub-line, rendered as a source comment. */
  comment: string;
}

/**
 * The `public class Foo {` heading shared by every page.
 *
 * The Java syntax is decoration: the real heading text is exposed to assistive
 * technology through a visually hidden span so a screen reader announces
 * "Projects", not "public class Projects open brace".
 */
const PageHeader: React.FC<PageHeaderProps> = ({ className_, title, comment }) => (
  <motion.div variants={fadeUp} className="mb-8">
    <h1 className="text-3xl font-bold mb-3 vscode-syntax-highlight">
      <span className="sr-only">{title}</span>
      <span aria-hidden="true">
        <span className="vscode-keyword">public class</span>{' '}
        <span className="vscode-class">{className_}</span> &#123;
      </span>
    </h1>
    <p className="text-lg max-w-2xl">
      <span className="vscode-comment">{`// ${comment}`}</span>
    </p>
  </motion.div>
);

export default PageHeader;
