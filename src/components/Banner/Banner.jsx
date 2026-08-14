import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./Banner.css";
import axios from "axios"; // swap for your existing axios instance if you have one

const BANNER_API_URL = "http://127.0.0.1:8000/api/admin/banners"; // update as needed
const MOBILE_BREAKPOINT = 768;

const getBannerList = async () => {
  const res = await axios.get(BANNER_API_URL);
  return res.data?.data?.data || [];
};

const Banner = () => {
  const splideRef = useRef(null);
  const splideInstance = useRef(null);
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  // Track resolution changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch banners once
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getBannerList();
        if (isMounted) setBanners(data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Build the list of images for the current resolution
  const bannerData = banners
    .filter((b) => b.is_published)
    .map((b, index) => ({
      id: b.id,
      bannerClass: `splide_${index + 1}`,
      bannerImg: isMobile ? b.mobile_image : b.desktop_image,
      categoryId: b.category?.id,
      categoryName: b.category?.category_name,
    }))
    .filter((b) => !!b.bannerImg);

  // Mount/remount Splide whenever the banner list (or resolution) changes
  useEffect(() => {
    if (!splideRef.current || bannerData.length === 0) return;

    if (splideInstance.current) {
      splideInstance.current.destroy();
      splideInstance.current = null;
    }

    splideInstance.current = new Splide(".banner-cl", {
      type: "fade",
      perPage: 1,
      arrows: bannerData.length > 1,
      pagination: false,
      autoplay: bannerData.length > 1, // only auto-scroll when more than 1 banner
      interval: 3000,
    }).mount();

    return () => {
      if (splideInstance.current) {
        splideInstance.current.destroy();
        splideInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerData.length, isMobile]);

  const handleBannerClick = (categoryId, categoryName) => {
    if (!categoryId || !categoryName) return;
    const params = new URLSearchParams({
      category_id: categoryId,
      category: categoryName,
    });
    navigate(`/categoryproducts?${params.toString()}`);
  };

  if (loading) return null; // or a skeleton loader
  if (bannerData.length === 0) return null;

  return (
    <div className="home-banner">
      <div className="splide banner-cl mb-4" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {bannerData.map((item) => (
              <li
                className={`splide__slide banner-slide-img ${item.bannerClass}`}
                key={item.id}
                onClick={() => handleBannerClick(item.categoryId, item.categoryName)}
              >
                <img
                  src={item.bannerImg}
                  alt={item.categoryName || "banner"}
                  className="banner-img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;