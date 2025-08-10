import { useState } from 'react'

const allImages = [
  {
    "filename": "image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg",
    "originalSrc": "https://static.wixstatic.com/media/92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg/v1/fill/w_980,h_600,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg",
    "alt": "image-0",
    "width": 980,
    "height": 600,
    "publicPath": "/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg"
  },
  {
    "filename": "image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp/v1/fill/w_571,h_250,al_c,q_30,blur_30,enc_avif,quality_auto/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "alt": "Geelmuyden Kiese Executives Appointed as Partners in Paritee",
    "width": 571,
    "height": 250,
    "publicPath": "/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp"
  },
  {
    "filename": "image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp/v1/fill/w_980,h_429,al_c,q_90,enc_avif,quality_auto/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "alt": "Geelmuyden Kiese Executives Appointed as Partners in Paritee",
    "width": 980,
    "height": 429,
    "publicPath": "/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp"
  },
  {
    "filename": "image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.jpg/v1/fill/w_571,h_250,fp_0.50_0.50,q_30,blur_30,enc_avif,quality_auto/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "alt": "Paritee appoints two partners from Geelmuyden Kiese Group",
    "width": 571,
    "height": 250,
    "publicPath": "/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp"
  },
  {
    "filename": "image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.jpg/v1/fill/w_980,h_429,fp_0.50_0.50,q_90,enc_avif,quality_auto/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "alt": "Paritee appoints two partners from Geelmuyden Kiese Group",
    "width": 980,
    "height": 429,
    "publicPath": "/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp"
  },
  {
    "filename": "image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.jpg/v1/fill/w_571,h_250,fp_0.50_0.50,q_30,blur_30,enc_avif,quality_auto/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "alt": "Paritee Secures Strategic €41 Million Growth Investment",
    "width": 571,
    "height": 250,
    "publicPath": "/images/image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp"
  },
  {
    "filename": "image-4-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.jpg/v1/fill/w_980,h_429,fp_0.50_0.50,q_90,enc_avif,quality_auto/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "alt": "Paritee Secures Strategic €41 Million Growth Investment",
    "width": 980,
    "height": 429,
    "publicPath": "/images/image-4-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp"
  },
  {
    "filename": "image-7-92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg",
    "originalSrc": "https://static.wixstatic.com/media/92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg/v1/fill/w_980,h_517,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg",
    "alt": "image-8",
    "width": 980,
    "height": 517,
    "publicPath": "/images/image-7-92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg"
  }
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div className="bg-white py-16">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-heading font-light text-center mb-12">
          Gallery
        </h2>
        
        {/* Main image display */}
        <div className="mb-8">
          <img 
            src={allImages[selectedImage].publicPath}
            alt={allImages[selectedImage].alt || `Image ${selectedImage + 1}`}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Thumbnail navigation */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-md overflow-hidden transition-opacity ${
                selectedImage === index ? 'opacity-100 ring-2 ring-black' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                src={image.publicPath}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}