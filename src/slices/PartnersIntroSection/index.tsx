import { type FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type JSXMapSerializer,
  type SliceComponentProps,
} from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `PartnersIntroSection`.
 */
export type PartnersIntroSectionProps =
  SliceComponentProps<Content.PartnersIntroSectionSlice>;

const components: JSXMapSerializer = {
  heading2: ({ children }) => <h2 className={styles.heading}>{children}</h2>,
  paragraph: ({ children }) => (
    <p className={styles.description}>{children}</p>
  ),
  hyperlink: ({ node, children }) => {
    return (
      <PrismicNextLink field={node.data} className={styles.link}>
        {children}
      </PrismicNextLink>
    );
  },
};

/**
 * Component for "Partners Intro Section" Slices.
 */
const PartnersIntroSection: FC<PartnersIntroSectionProps> = ({ slice }) => {
  const { heading, description, buttonText, buttonLink } = slice.primary;
  const showButton = isFilled.link(buttonLink) && Boolean(buttonText?.trim());

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.container}>
        <PrismicRichText field={heading} components={components} />
        <PrismicRichText field={description} components={components} />

        {showButton && (
          <PrismicNextLink field={buttonLink} className={styles.button}>
            {buttonText}
          </PrismicNextLink>
        )}
      </div>
    </section>
  );
};

export default PartnersIntroSection;
