import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import styles from '/styles/Home.module.css'
import Head from 'next/head';
import hl from 'highlight.js';
import 'highlight.js/styles/vs2015.css'

// Getstaticprops runs on the server making the website faster
export async function getStaticProps() {
  // Sets markdownwithmeta to path to post file
  const markdownWithMeta = fs.readFileSync(
    "pages/page.md",
    'utf-8'
  )
    // Gets frontmatter and content of post
  const { data: frontmatter, content } = matter(markdownWithMeta)

  // Returns everything to PostPage 
  return {
    props: {
      frontmatter,
      html: marked(content, {
        highlight: function(code, lang) {
          return hl.highlight(lang, code).value;
        },
    }),
  }
}}

export default function Home({
  // Gets the variables from staticprops
  frontmatter: { title, description},
  html, 
}: any) {
  return (
    <div className={styles.container}>
      {/* Sets the metadata and title of page to post details */}
      <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="\favicon.ico" />
      </Head>
      
      {/* Displays the content of post*/}
      <div className="htmltext" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
}
