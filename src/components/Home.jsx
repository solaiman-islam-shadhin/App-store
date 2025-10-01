import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LoadingSpinner } from './LoadingSpinner';

export const Home = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const slides = [
    { id: 1, title: "New Gaming Experience", subtitle: "Discover the latest mobile games",image : "https://store-images.s-microsoft.com/image/apps.48303.14471421918435459.9f7a2948-91cb-4362-88d1-34af2a02ae78.42505256-c533-4326-9113-8ed92c1bda32" },
    { id: 2, title: "Educational Apps Sale", subtitle: "Learn new skills with premium apps",image : "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhfRM_njI7Pu32CmBLMdmnnIBZGppA1ryywELZ_AzofNCOHN5.Nb_7xTpPnW8jI61ss2BV_E1MashVXHKngdwl0-&format=source" },
    { id: 3, title: "Entertainment Hub", subtitle: "Stream your favorite content",image : "https://store-images.s-microsoft.com/image/apps.24508.14205055896346606.12bce790-a1b5-480e-a36a-23414c70c219.5a94d26a-a8bc-43ad-95cd-283a0988439b" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading apps..." />
      </div>
    );
  }

  const trendingApps = [...apps].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = ['Games', 'Entertainment', 'Education'];

  return (
    <div className="min-h-screen">
      {/* Slider */}
      <section className="container mx-auto mt-10 rounded-3xl relative h-96 mb-12 ">
        <div className="absolute inset-0 opacity-60  rounded-3xl overflow-hidden w-full h-full " >
          <img className='w-full h-full object-cover'src={slides[currentSlide].image} alt="" />
        </div> 
        <div className=" relative flex items-end pb-10 justify-center h-full text-white text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4 ">{slides[currentSlide].title}</h1>
            <p className="text-xl mb-6">{slides[currentSlide].subtitle}</p>
            <button className="btn btn-primary btn-lg">Explore Now</button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Trending Apps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Trending Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingApps.map((app) => (
              <Link key={app.id} to={`/app/${app.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <figure className="px-4 pt-4">
                  <img src={app.thumbnail} alt={app.name} className="rounded-xl w-full h-56 object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-sm">{app.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold">⭐ {app.rating}</span>
                    <span className="text-xs">📥 {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        {categories.map((category) => {
          const categoryApps = apps.filter(app => app.category === category);
          return (
            <section key={category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryApps.map((app) => (
                  <Link key={app.id} to={`/app/${app.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                    <figure className="px-4 pt-4">
                      <img src={app.thumbnail} alt={app.name} className="rounded-xl w-full h-56 object-cover" />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="card-title text-sm">{app.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold">⭐ {app.rating}</span>
                        <span className="text-xs">📥 {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Recently Updated */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Recently Updated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {apps.slice(0, 6).map((app) => (
              <Link key={app.id} to={`/app/${app.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <figure className="px-4 pt-4">
                  <img src={app.thumbnail} alt={app.name} className="rounded-xl w-full h-56 object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-sm">{app.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold">⭐ {app.rating}</span>
                    <span className="text-xs">📥 {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};