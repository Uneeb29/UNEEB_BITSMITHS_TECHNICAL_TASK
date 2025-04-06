import { getStory, formatTime, getDomain } from "../lib/api"

interface StoryItemProps {
  id: number
  rank: number
}

export default async function StoryItem({ id, rank }: StoryItemProps) {
  const story = await getStory(id)

  if (!story) {
    return null
  }

  const domain = getDomain(story.url)

  return (
    <tr className="align-top">
      <td className="text-right align-top pl-2 pt-2 text-[#828282]" width="30">
        {rank}.
      </td>
      <td className="pt-2 pr-1 text-center align-top" width="10">
        <div className="triangle" aria-label="upvote"></div>
      </td>
      <td className="pt-2">
        <span className="story-title">
          <a
            href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="story-title"
          >
            {story.title}
          </a>
        </span>
        {domain && (
          <span className="story-meta ml-1">
            (
            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
              {domain}
            </a>
            )
          </span>
        )}
        <div className="story-meta">
          {story.score} points by {story.by} {formatTime(story.time)} |
          <a
            href={`https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            hide
          </a>{" "}
          |
          <a
            href={`https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            {story.descendants || 0} comments
          </a>
        </div>
      </td>
    </tr>
  )
}

