"use client";

import { type FC, useMemo, useState } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `FeaturedPartners`.
 */
export type FeaturedPartnersProps =
  SliceComponentProps<Content.FeaturedPartnersSlice>;

function normalizeType(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Component for "Featured Partners" Slices.
 */
const FeaturedPartners: FC<FeaturedPartnersProps> = ({ slice }) => {
  const title = isFilled.keyText(slice.primary.section_title)
    ? slice.primary.section_title
    : "Featured Partners";

  const partnerItems = useMemo(() => {
    return slice.primary.partners
      .map((item, index) => {
        const category = isFilled.keyText(item.category) ? item.category : "";
        const name = isFilled.keyText(item.name) ? item.name : "";
        const key = `${category}-${name}-${index}`;
        return { ...item, key, category, name };
      })
      .filter((item) => item.category || item.name || isFilled.image(item.logo));
  }, [slice.primary.partners]);

  const types = useMemo(() => {
    const unique = new Map<string, string>();
    for (const item of partnerItems) {
      if (!item.category) continue;
      const normalized = normalizeType(item.category);
      if (!unique.has(normalized)) unique.set(normalized, item.category);
    }
    return ["All Types", ...Array.from(unique.values())];
  }, [partnerItems]);

  const defaultType =
    typeof slice.primary.filter_type === "string" &&
    types.includes(slice.primary.filter_type)
      ? slice.primary.filter_type
      : "All Types";

  const [activeType, setActiveType] = useState<string>(defaultType);

  const visiblePartners =
    activeType === "All Types"
      ? partnerItems
      : partnerItems.filter(
          (item) => normalizeType(item.category) === normalizeType(activeType),
        );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.filter}>
            <select
              className={styles.select}
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              aria-label="Filter partner type"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className={styles.selectIcon} aria-hidden="true">
              <svg
                width="18"
                height="18"
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
          </div>

          <h2 className={styles.title}>{title}</h2>
          <div className={styles.headerSpacer} aria-hidden="true" />
        </div>

        <ul className={styles.grid}>
          {visiblePartners.map((partner) => (
            <li className={styles.card} key={partner.key}>
              <div className={styles.logoWrap}>
                {isFilled.image(partner.logo) ? (
                  <PrismicNextImage
                    field={partner.logo}
                    className={styles.logo}
                  />
                ) : (
                  <div className={styles.logoFallback} aria-hidden="true" />
                )}
              </div>
              <div className={styles.cardBody}>
                {partner.category && (
                  <p className={styles.category}>{partner.category}</p>
                )}
                {partner.name && <p className={styles.name}>{partner.name}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedPartners;
