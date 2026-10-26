// Server-rendered metadata reaches link crawlers even before onboarding or JS.
export function linkPreview(title,description,url='/',image='/opengraph-image'){
  const full=`${title} | Nook`;
  const images=[{url:image,width:1200,height:630,alt:title}];
  return {title:full,description,openGraph:{type:'website',siteName:'Nook',title:full,description,url,images},twitter:{card:'summary_large_image',title:full,description,images:[image]}};
}
