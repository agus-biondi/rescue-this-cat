# Cloudinary Optimization Checklist

## 1. Ship the smallest file the browser can render
- [x] Using `f_auto` for automatic format selection
- [x] Using `q_auto` for automatic quality optimization
- [x] Implement proper width/height constraints for all images
- [x] Set up responsive breakpoints in next.config.mjs
- [x] Implement custom Cloudinary loader
- [x] Optimize video delivery with `vc_auto` and `crf`

## 2. Cache aggressively—and predictably
- [x] Using version numbers in paths (e.g., v1747091094)
- [x] Implement Cache-Control headers (via vercel.json)
- [x] Avoid timestamp query strings
- [x] Set up CDN caching strategy (via Cloudinary's CDN)

## 3. Lazy-load and pre-connect
- [x] Using `loading="lazy"` for off-screen images
- [x] Using `priority` for above-the-fold images
- [x] Implement loading placeholders
- [x] Optimize third-party embeds
- [ ] Defer social OG images

## 4. Keep derivative multiplication under control
- [x] Implement named transforms
- [x] Standardize breakpoints
- [x] Consolidate quality settings
- [x] Remove ad-hoc transformations
- [x] Implement consistent transformation parameters

## 5. Audit & alert
- [ ] Set up bandwidth monitoring
- [ ] Create alerts for bandwidth spikes
- [ ] Run "Top Derived Assets by Bandwidth" report
- [ ] Audit for original uploads being served
- [ ] Check for external hot-linking
- [ ] Identify large assets (>1MB)

## Current Implementation Status
- Using custom Cloudinary loader with optimized settings
- Proper width/height constraints implemented
- Basic lazy loading implemented
- Version numbers in URLs
- Priority loading for hero images
- Standardized breakpoints in next.config.mjs
- Automatic format and quality optimization
- Loading placeholders implemented
- Consistent transformation parameters via custom loader
- Cache-Control headers configured
- Video optimization with vc_auto and crf implemented
- CloudinaryVideo component created for consistent video handling

## Next Steps

### 1. Video Optimization
- [x] Add `vc_auto` parameter to video URLs
- [x] Implement `crf` quality setting
- [x] Add proper video sizing with `c_fill,w_...`
- [x] Create a CloudinaryVideo component

### 2. Monitoring Setup
- [ ] Go to Cloudinary Console → Settings → Usage & Billing → Alerts
- [ ] Create alert for 20% bandwidth spike above 30-day average
- [ ] Set up weekly bandwidth reports
- [ ] Configure asset usage monitoring
- [ ] Monitor cache performance:
  - [ ] Check browser cache hits in DevTools
  - [ ] Review Cloudinary CDN cache statistics
  - [ ] Track bandwidth savings from caching
  - [ ] Set up cache hit rate alerts

### 3. Asset Audit
- [ ] Run "Top Derived Assets by Bandwidth" report
- [ ] Check for any original uploads being served
- [ ] Look for external hot-linking
- [ ] Identify and optimize large assets (>1MB)
- [ ] Review and optimize social media images

### 4. Performance Verification
- [ ] Test image loading performance
- [ ] Verify format selection (AVIF/WebP/JPEG)
- [ ] Check responsive image delivery
- [ ] Monitor cache hit rates
- [ ] Verify lazy loading behavior
- [ ] Test video optimization effectiveness

Would you like me to help you set up the monitoring in Cloudinary's dashboard to track cache performance? 