import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import style from "./style.module.css"
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ComponentPropsWithoutRef } from "react";

// async function getDocs(slug: string) {
    
//   const doc = about.find((doc) => 
//     doc.slug === `about/${slug}`
// );
//   return doc;
// }

const GITHUB_RAW_TECHS_URL =
"https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/refs/heads/main/about/techs.md";
const GITHUB_RAW_TECHS_BASE = 
"https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/refs/heads/main/about/";


async function fetchMarkdownFile(filename?: string): Promise<string | null> {
  try {
    let response: Response|{ok:false} = {ok:false}
    if(!filename){
    response = await fetch(`${GITHUB_RAW_TECHS_URL}`);
  }
    if(filename === "techs" || filename === "degrees"){
    response = await fetch(`${GITHUB_RAW_TECHS_BASE}${filename}.md`);
  }
    if (!response.ok) {
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching the Markdown file:", error);
    return null;
  }
}

// async function parseMarkdownToHtml(markdown: string): Promise<string> {
//   const processedContent = await remark().use(html).process(markdown);
//   return processedContent.toString();
// }

const components = {
    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
      <Card
        className="relative my-2 shadow-sm shadow-secondary-foreground hover:shadow-md hover:shadow-secondary border-l-4 border-border/5 bg-muted/15 hover:bg-secondary/5 px-4 py-3"
      >
        {children}
      </Card>
    ),
    p: (props: ComponentPropsWithoutRef<'p'>) => (
      <p className={style.img} {...props} />
    ),
    h4: (props: ComponentPropsWithoutRef<'h4'>) => (
      <h4 className="mt-1" {...props} />
    ),
    hr: (props: ComponentPropsWithoutRef<'hr'>) => (
      <hr className="mt-2" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<'a'>) => (
      <Link 
        target="_blank" 
        href={props.href || '#'}
        {...props}
      />
    ),
  };

  export default async function DocPage(
    {
    params,
  }: {
    params: Promise<{ slug: string }>
  }
) {
    const slug = (await params).slug
    const doc = await fetchMarkdownFile(slug)
    // const doc = await fetchMarkdownFile()
  
    if (!doc) notFound();
  
    return (
      <main className="container pt-20 pb-4 mx-auto max-w-5xl px-4 h-screen flex flex-col">
        <article className="rounded-lg border bg-card p-6 shadow-sm overflow-y-auto flex-1">
          <MDXRemote source={doc} components={components}/>
        </article>
      </main>
    );
  }