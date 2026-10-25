// Server-rendered metadata reaches link crawlers even before onboarding or JS.
export function linkPreview(title,description,url='/'){
  const full=`${title} | Nook`;
  const images=[{url:'/opengraph-image',width:1200,height:630,alt:'Nook: learn everyday phone tasks safely'}];
  return {title:full,description,openGraph:{type:'website',siteName:'Nook',title:full,description,url,images},twitter:{card:'summary_large_image',title:full,description,images:['/opengraph-image']}};
}
