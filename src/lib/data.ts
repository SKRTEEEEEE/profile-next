export const creatorData = {
  githubUrl: "https://github.com/SKRTEEEEEE",
  email: "adanreh.m@gmail.com",
  emailTo: `mailto:adanreh.m@gmail.com`,
  twitter: "https://x.com/queen420nft",
  profileWebUrl: "https://profile-skrt.vercel.app"
}

const getMetadataSection = (options: {name: string, desc:string}) => {
  return {
      name: options.name,
      url: creatorData.profileWebUrl,
      description: options.desc,
      author: "Adan Reh",
      links:{
          twitter: creatorData.twitter,
          github: creatorData.githubUrl,
          personalSite: creatorData.profileWebUrl
      }
  }
}

export const metadataMain = getMetadataSection({name: "SkrtPage",desc: "Nextjs 15 profile programmer page"})
export const metadataBlog = getMetadataSection({name: "SkrtBlog",desc: "NextJs 15 exercises blog"})
export const metadataAdmin = getMetadataSection({name: "SkrtAdmin",desc: "NextJs 15 admin dashboard for the page"})
