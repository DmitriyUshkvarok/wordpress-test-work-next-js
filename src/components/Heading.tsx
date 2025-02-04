import React from 'react';
import {
  getFontSizeForHeading,
  getTextAlign,
  TextAlign,
  HeadingLevel,
} from '../utils/fonts';

export interface HeadingProps {
  textAlign?: TextAlign;
  content?: string;
  level?: HeadingLevel;
}

export const Heading = ({
  textAlign = 'left',
  content,
  level,
}: HeadingProps) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-w-5xl mx-auto my-6 text-gray-400 ${getFontSizeForHeading(
      level as HeadingLevel
    )} ${getTextAlign(textAlign)}`,
  });
  return tag;
};
