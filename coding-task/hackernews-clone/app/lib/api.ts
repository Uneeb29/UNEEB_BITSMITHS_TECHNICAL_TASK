export interface Story {
    id: number
    title: string
    url?: string
    text?: string
    by: string
    time: number
    score: number
    descendants: number
  }
  
  export async function getTopStories(): Promise<number[]> {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 60 } }, // Cache for 1 minute
    )
  
    if (!response.ok) {
      throw new Error("Failed to fetch top stories")
    }
  
    return response.json()
  }
  
  export async function getStory(id: number): Promise<Story> {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      { next: { revalidate: 60 } }, 
    )
  
    if (!response.ok) {
      throw new Error(`Failed to fetch story with ID ${id}`)
    }
  
    return response.json()
  }
  
  export async function getStories(ids: number[]): Promise<Story[]> {
    const stories = await Promise.all(ids.map((id) => getStory(id).catch(() => null)))
  
    return stories.filter((story): story is Story => story !== null)
  }
  
  export async function searchStories(query: string): Promise<Story[]> {
    const storyIds = await getTopStories()
  
    const stories = await getStories(storyIds.slice(0, 100))
  
    const lowercaseQuery = query.toLowerCase()
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(lowercaseQuery) ||
        (story.text && story.text.toLowerCase().includes(lowercaseQuery)),
    )
  }
  
  export function formatTime(time: number): string {
    const now = Math.floor(Date.now() / 1000)
    const diff = now - time
  
    if (diff < 60) {
      return `${diff} seconds ago`
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diff / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }
  
  export function getDomain(url?: string): string {
    if (!url) return ""
  
    try {
      const domain = new URL(url).hostname.replace("www.", "")
      return domain
    } catch (error) {
      return ""
    }
  }
  
  