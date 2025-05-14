export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // Remove any existing Cloudinary parameters from the src
  const cleanSrc = src.split('?')[0]
  
  // Build the transformation parameters
  const params = [
    'f_auto', // Automatic format selection
    'c_limit', // Maintain aspect ratio
    `w_${width}`, // Width
    `q_${quality || 'auto'}`, // Quality
  ]

  // Construct the Cloudinary URL
  return `https://res.cloudinary.com/dszhwrn7m/image/upload/${params.join(',')}/${cleanSrc}`
} 