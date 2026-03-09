import { type FC } from "react";
import { asText, isFilled, type Content, type RichTextField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type JSXMapSerializer,
  type SliceComponentProps,
} from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `BenefitHrSolutionSection`.
 */
export type BenefitHrSolutionSectionProps =
  SliceComponentProps<Content.BenefitHrSolutionSectionSlice>;

const supportingHeadlineComponents: JSXMapSerializer = {
  heading4: ({ children }) => (
    <h3 className={styles.cardTitle}>{children}</h3>
  ),
};

const descriptionSubtitleComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className={styles.cardSubtitle}>{children}</p>
  ),
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className={styles.link}>
      {children}
    </PrismicNextLink>
  ),
};

const descriptionBodyComponents: JSXMapSerializer = {
  paragraph: ({ children }) => <p className={styles.cardBody}>{children}</p>,
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className={styles.link}>
      {children}
    </PrismicNextLink>
  ),
};

/**
 * Component for "Benefit HR Solution Section" Slices.
 */
const BenefitHrSolutionSection: FC<BenefitHrSolutionSectionProps> = ({
  slice,
}) => {
  const headlineText = isFilled.keyText(slice.primary.headline)
    ? slice.primary.headline
    : "Benefits & HR Solutions";

  const cardTitleText = asText(slice.primary.supporting_headline).trim();

  const description = slice.primary.description ?? [];
  const subtitleField: RichTextField | undefined =
    description.length > 0 ? (description.slice(0, 1) as RichTextField) : undefined;
  const bodyField: RichTextField | undefined =
    description.length > 1 ? (description.slice(1) as RichTextField) : undefined;

  const bullets = slice.primary.bullets
    .map((item) => item.bullet_text)
    .filter((value): value is string => isFilled.keyText(value));

  const ctaText =
    typeof (slice.primary.cta_link as { text?: unknown }).text === "string" &&
    (slice.primary.cta_link as { text: string }).text.trim().length > 0
      ? (slice.primary.cta_link as { text: string }).text.trim()
      : "Learn More";

  const showCta = isFilled.link(slice.primary.cta_link);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.container}>
        <nav className={styles.tabs} aria-label="Partner solution categories">
          <button type="button" className={styles.tabActive}>
            {headlineText}
          </button>
          <button type="button" className={styles.tab}>
            Technology &amp; Integration Partners
          </button>
          <button type="button" className={styles.tab}>
            Industry Solutions Partners
          </button>
          <button type="button" className={styles.tabMore}>
            More
            <span className={styles.tabChevron} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8L10 12L14 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </nav>

        <h2 className={styles.headline}>{headlineText}</h2>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.logoBox}>
              {isFilled.image(slice.primary.logo) ? (
                <PrismicNextImage
                  field={slice.primary.logo}
                  className={styles.logo}
                />
              ) : (
                <div className={styles.logoFallback} aria-hidden="true" />
              )}
            </div>

            <div className={styles.cardContent}>
              <PrismicRichText
                field={slice.primary.supporting_headline}
                components={supportingHeadlineComponents}
              />
              {subtitleField && (
                <PrismicRichText
                  field={subtitleField}
                  components={descriptionSubtitleComponents}
                />
              )}
              {bodyField && (
                <PrismicRichText
                  field={bodyField}
                  components={descriptionBodyComponents}
                />
              )}
            </div>
          </div>

          <div className={styles.why}>
            <h3 className={styles.whyTitle}>
              {cardTitleText ? `Why ${cardTitleText}?` : "Why this partner?"}
            </h3>

            {bullets.length > 0 && (
              <ul className={styles.bullets}>
                {bullets.map((text, idx) => (
                  <li key={`${idx}-${text}`}>{text}</li>
                ))}
              </ul>
            )}

            {showCta && (
              <PrismicNextLink field={slice.primary.cta_link} className={styles.cta}>
                {ctaText}
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </PrismicNextLink>
            )}
          </div>
        </div>

        <div className={styles.accordions}>
          <details className={styles.accordion}>
            <summary className={styles.accordionSummary}>
              Technology &amp; Integration Partners
              <span className={styles.accordionChevron} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
          </details>

          <details className={styles.accordion}>
            <summary className={styles.accordionSummary}>
              Industry Solutions Partners
              <span className={styles.accordionChevron} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
          </details>
        </div>
      </div>
    </section>
  );
};

export default BenefitHrSolutionSection;
