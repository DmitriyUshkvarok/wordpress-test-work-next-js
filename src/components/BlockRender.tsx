import { Paragraph } from './Paragraph';
import { Cover } from './Cover';
import { Heading } from './Heading';
import { Block } from '@/utils/cleanAndTransformBlocks';
import { TextAlign } from '@/utils/fonts';
import { theme } from '../../theme';
import CallToActionButton from './ui/CallToActionButton';
// import { Columns } from '../Columns/Columns';
import { Column } from './Column';
// import Image from 'next/image';
// import { PropertySearch } from '../PropertySearch/PropertySearch';
// import { FormspreeForm } from '../FormspreeForm/FormspreeForm';
// import { PropertyFeatures } from '../PropertyFeatures/PropertyFeatures';
// import { Gallery } from '../Gallery/Gallery';
// import { TickItem } from '../TickItem/TickItem';

interface BlockRendererProps {
  blocks: Block[];
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  return blocks.map((block) => {
    switch (block.name) {
      //   case 'acf/propertyfeatures': {
      //     return (
      //       <PropertyFeatures
      //         key={block.id}
      //         price={block?.attributes?.price as string}
      //         bathrooms={block?.attributes?.bathrooms as string}
      //         bedrooms={block?.attributes?.badrooms as string}
      //         hasParking={block?.attributes?.has_parking as boolean}
      //         petFriendly={block?.attributes?.pet_friendly as boolean}
      //       />
      //     );
      //   }
      //   case 'acf/tickitem': {
      //     return (
      //       <TickItem key={block.id}>
      //         <BlockRenderer blocks={block.innerBlocks || []} />
      //       </TickItem>
      //     );
      //   }
      //   case 'core/post-title':
      case 'core/heading': {
        return (
          <Heading
            key={block.id}
            level={block.attributes?.level}
            content={block.attributes?.content}
            textAlign={block.attributes?.textAlign}
          />
        );
      }
      //   case 'core/search': {
      //     return <PropertySearch key={block.id} />;
      //   }
      case 'core/cover':
        return (
          <Cover key={block.id} background={block.attributes?.url as string}>
            <BlockRenderer blocks={block.innerBlocks || []} />
          </Cover>
        );
      //   case 'core/gallery': {
      //     return (
      //       <Gallery
      //         key={block.id}
      //         columns={block.attributes?.columns as number}
      //         cropImages={block.attributes?.imageCrop as boolean}
      //         items={block?.innerBlocks as []}
      //       />
      //     );
      //   }

      //   case 'acf/formspreeform': {
      //     return <FormspreeForm key={block.id} />;
      //   }
      case 'core/paragraph': {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes?.textAlign as TextAlign}
            content={block.attributes?.content}
            textColor={
              theme[block.attributes?.textColor as keyof typeof theme] ||
              block.attributes?.style?.color?.text
            }
          />
        );
      }
      case 'core/buttons': {
        return (
          <div key={block.id} className="buttons-container">
            {block.innerBlocks?.map((innerBlock) => {
              return (
                <CallToActionButton
                  key={innerBlock.id}
                  content={innerBlock.attributes?.content as string}
                  url={innerBlock.attributes?.url as string}
                />
              );
            })}
          </div>
        );
      }
      //   case 'core/columns': {
      //     return (
      //       <Columns
      //         key={block.id}
      //         isStackedOnMobile={block.attributes?.isStackedOnMobile as boolean}
      //         textColor={
      //           theme[block.attributes?.textColor as keyof typeof theme] ||
      //           block.attributes?.style?.color?.text ||
      //           ''
      //         }
      //         backgroundColor={
      //           theme[block.attributes?.backgroundColor as keyof typeof theme] ||
      //           block.attributes?.style?.color?.background ||
      //           ''
      //         }
      //       >
      //         <BlockRenderer blocks={block.innerBlocks || []} />
      //       </Columns>
      //     );
      //   }
      case 'core/column': {
        return (
          <Column
            key={block.id}
            width={block.attributes?.width as string}
            textColor={
              theme[block.attributes?.textColor as keyof typeof theme] ||
              block.attributes?.style?.color?.text ||
              ''
            }
            backgroundColor={
              theme[block.attributes?.backgroundColor as keyof typeof theme] ||
              block.attributes?.style?.color?.background ||
              ''
            }
          >
            <BlockRenderer blocks={block.innerBlocks || []} />
          </Column>
        );
      }
      //   case 'core/group':
      //   case 'core/block': {
      //     return (
      //       <BlockRenderer key={block.id} blocks={block.innerBlocks || []} />
      //     );
      //   }
      //   case 'core/image': {
      //     return (
      //       <Image
      //         className="max-w-full h-[320px]"
      //         key={block.id}
      //         src={
      //           block.attributes?.url
      //             ? block.attributes?.url.replace('https:', 'http:')
      //             : ('' as string)
      //         }
      //         height={block.attributes?.height as number}
      //         width={block.attributes?.width as number}
      //         alt={block.attributes?.alt || ''}
      //         priority
      //       />
      //     );
      //   }
      default:
        console.warn('Unknown block type:', block.name);
        return null;
    }
  });
};
