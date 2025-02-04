import { v4 as uuid } from 'uuid';
import { HeadingLevel, TextAlign } from './fonts';

export interface LayoutAttributes {
  type?: string;
  justifyContent?: 'left' | 'center' | 'right';
  width?: string;
}

export interface ImageAttributes {
  height?: number | string;
  linkDestination?: string;
  sizeSlug?: string;
  url?: string;
  width?: number | string;
  alt?: string;
}

export interface BlockAttributes {
  level?: HeadingLevel;
  content?: string;
  textAlign?: TextAlign;
  textColor?: string;
  url?: string;
  alt?: string;
  bedrooms?: string;
  bathrooms?: string;
  price?: string;
  hasParking?: boolean;
  petFriendly?: boolean;

  style?: {
    color?: {
      text?: string;
      background?: string;
    };
    layout?: LayoutAttributes;
    image?: ImageAttributes;
  };
  data?: {
    form_id?: string;
  };
  [key: string]: unknown;
}

// Интерфейс блока
export interface Block {
  id?: string;
  name: string;
  attributes?: BlockAttributes & { layout?: LayoutAttributes } & {
    image?: ImageAttributes;
  };
  innerBlocks?: Block[];
}

// Функция для очистки и добавления id блокам
export const cleanAndTransformBlocks = (blocksJSON: Block[]): Block[] => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  // Рекурсивная функция для назначения id
  const assignId = (b: Block[]): void => {
    b.forEach((block) => {
      block.id = uuid();
      if (!block.attributes) {
        block.attributes = {}; // Если нет атрибутов, создаем пустой объект
      }
      if (block.innerBlocks?.length) {
        assignId(block.innerBlocks); // Рекурсивно присваиваем id для вложенных блоков
      }
    });
  };

  assignId(blocks);

  return blocks;
};
