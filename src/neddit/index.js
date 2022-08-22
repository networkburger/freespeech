import React, { useState, useRef, useEffect } from "react";
import "./neddit.css";

const icon = {
  home: (
    <svg viewBox="0 0 24 24">
      <path fill="white" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
    </svg>
  ),
  back: (
    <svg viewBox="0,0,16,16">
      <path d="M12,2 L4,8 L12,14" />
    </svg>
  ),
  plus: (
    <svg viewBox="0,0,16,16">
      <path d="M2,8 L14,8 M8,2 L8,14" />
    </svg>
  ),
  minus: (
    <svg viewBox="0,0,16,16">
      <path d="M2,8 L14,8" />
    </svg>
  ),
  category: (
    <svg viewBox="0,0,16,16">
      <path d="M2,4 L14,4 M2,8 L14,8 M2,12 L14,12" />
    </svg>
  ),
  new: (
    <svg viewBox="0,0,16,16">
      <path d="M2,8 L14,8 M8,2 L8,14" />
    </svg>
  ),
  card: (
    <svg viewBox="0,0,16,16">
      <path d="M2,2 L10,2 L10,10 L2,10 Z M14,3 L14,14 L3,14" />
    </svg>
  ),
  play: (
    <svg className="svg-filled" viewBox="0,0,16,16">
      <path d="M2,2 L14,8 L2,14 Z" />
    </svg>
  ),
  tick: (
    <svg viewBox="0,0,16,16">
      <path d="M2,11 L7,14 L14,0" />
    </svg>
  ),
  cog: (
    <svg viewBox="0 0 24 24">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  ),
  cross: (
    <svg viewBox="0,0,16,16">
      <path d="M2,2 L14,14 M2,14 L14,2" />
    </svg>
  ),
  backspace: (
    <svg className="svg-filled" viewBox="0,0,16,16">
      <path d="M6,2 L14,2 L14,14 L6,14 L2,8 Z" />
    </svg>
  ),
  disclosureClosed: (
    <svg className="svg-filled" viewBox="0,0,16,16">
      <path d="M2,2 L4,2 L14,8 L4,14 L2,14 Z" />
    </svg>
  ),
  disclosureOpen: (
    <svg className="svg-filled" viewBox="0,0,16,16">
      <path d="M2,2 L14,2 L14,4 L8,14 L2,4 L2,2 Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24">
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24">
      <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24">
      <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
    </svg>
  ),
  hidden: (
    <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24">
      <g>
        <g>
          <path d="M19,5v11.17l2,2V5c0-1.1-0.9-2-2-2H5.83l2,2H19z" />
          <path d="M2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61l1.41-1.41L2.81,2.81z M5,19V7.83l7.07,7.07L11.25,16 L9,13l-3,4h8.17l2,2H5z" />
        </g>
      </g>
    </svg>
  ),
};

const urlParams = new URLSearchParams(window.location.search);

export function NedditApp() {
  const sub = urlParams.get("r");
  return (
    <div className="neddit">
      <SubHeader sub={sub} />
      <Subreddit
        sub={sub}
        after={urlParams.get("after")}
        best={urlParams.get("best")}
      />
      <SubHeader sub={sub} />
    </div>
  );
}

const presets = [
  "popular",
  "formuladank",
  "formula1",
  "tihi",
  "holup",
  "maybemaybemaybe",
  "unexpected",
  "interestingasfuck",
  "pcgaming",
  "oddlysatisfying",
];

function goToSub(r, after, best) {
  const parts = [
    `r=${r}`,
    after ? `after=${after}` : null,
    best ? `best=${best}` : null,
  ]
    .filter((x) => x)
    .join("&");
  window.location = encodeURI(`/neddit?${parts}`);
}

function BestBar({ sub }) {
  return (
    <div className="bestbar">
      <button onClick={() => goToSub(sub, null, "day")}>DAY</button>
      <button onClick={() => goToSub(sub, null, "week")}>WEEK</button>
      <button onClick={() => goToSub(sub, null, "month")}>MONTH</button>
      <button onClick={() => goToSub(sub, null, "year")}>YEAR</button>
      <button onClick={() => goToSub(sub, null, "all")}>ALLTIME</button>
    </div>
  );
}

function SubHeader({ sub }) {
  const subref = useRef();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="sub-header">
      <div className="sub-header-controls">
        <button className="toggler" onClick={() => setExpanded(!expanded)}>
          <span>{sub}</span>
        </button>
      </div>
      {expanded ? (
        <>
          <input
            type="text"
            ref={subref}
            defaultValue={sub}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                goToSub(subref.current.value);
              }
            }}
          />

          <BestBar sub={sub} />
          <div className="preset-subs">
            {presets.map((p) => (
              <button onClick={() => goToSub(p)}>{p}</button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Subreddit({ sub, after, best }) {
  const [json, setJson] = useState(null);
  useEffect(() => {
    (async () => {
      const args = [after ? `after=${after}` : null, best ? `t=${best}` : null]
        .filter((x) => x)
        .join("&");
      const rjs = await (
        await fetch(
          `https://www.reddit.com/r/${sub}${best ? "/top" : ""}.json?${args}`
        )
      ).json();
      setJson(rjs);
    })();
  }, [sub, after, best]);
  return json ? (
    <div className="subreddit">
      {json.data.children.map((post, pid) => (
        <Post content={post} key={pid} />
      ))}
      <div className="post-nav">
        <button onClick={() => goToSub(sub, json.data.before, best)}>
          PREV
        </button>
        <button onClick={() => goToSub(sub, json.data.after, best)}>
          NEXT
        </button>
      </div>
    </div>
  ) : (
    "..."
  );
}

const df = (hours) =>
  hours > 8640
    ? `${(hours / 8640).toFixed(1)} y`
    : hours > 720
    ? `${(hours / 720).toFixed(1)} m`
    : hours > 168
    ? `${(hours / 168).toFixed(1)} w`
    : hours > 24
    ? `${(hours / 24).toFixed(1)} d`
    : `${hours.toFixed(0)} hr`;

function Post({ content }) {
  const post = content.data;

  const inlineContent =
    post.post_hint === "image" ? (
      <img src={post.url} alt="" />
    ) : post.media && post.media.type === "imgur.com" ? (
      <img src={post.media.oembed.url + ".jpg"} alt="" />
    ) : post.media && post.media.reddit_video ? (
      <video controls preload="metadata">
        <source src={post.media.reddit_video.fallback_url} />
      </video>
    ) : post.media && post.media.oembed && post.media.oembed.html ? (
      <div
        className="gif"
        style={{ height: `${post.media.oembed.height}px` }}
        dangerouslySetInnerHTML={htmlDecode(
          post.media.oembed.html.replace('style="position:absolute;"', "")
        )}
      />
    ) : post.preview && post.preview.reddit_video_preview ? (
      <video controls preload="metadata">
        <source src={post.preview.reddit_video_preview.fallback_url} />
      </video>
    ) : null;

  return (
    <div className="post">
      <div className="post-meta">
        <a href={`/neddit?r=${post.subreddit}`} className="posted-to-sub">
          {post.subreddit_name_prefixed}
        </a>
        <a href={`https://www.reddit.com/u/${post.author}`} className="author">
          {icon.person}
          {post.author}
        </a>
        <a href={post.url} className="domain">
          {icon.link}
          {post.domain}
        </a>
      </div>

      <div className="post-synopsis">
        {inlineContent ? (
          <>
            <h2>{post.title}</h2>
          </>
        ) : (
          <>
            <Preview post={content} />
            <h2>{post.title}</h2>
          </>
        )}
      </div>

      {inlineContent}

      <div className="post-footer">
        <span className="score">
          {icon.arrowUp}
          {post.score}
        </span>

        <a
          href={"https://www.reddit.com" + post.permalink}
          className="comments"
        >
          {icon.chat}
          {post.num_comments}
        </a>

        <span className="created">
          {icon.clock}
          {df((Date.now() / 1000 - post.created_utc) / 60 / 60)}
        </span>
      </div>
    </div>
  );
}

function Preview({ post }) {
  const d = post.data;
  return (
    <div className="preview">
      {d.thumbnail ? (
        d.thumbnail === "self" ? (
          <span className="post-thumbnail">{icon.person}</span>
        ) : d.thumbnail === "nsfw" ? (
          <span className="post-thumbnail">{icon.hidden}</span>
        ) : d.post_hint === "link" && (!d.media || !d.media.oembed) ? (
          <img className="post-thumbnail" alt={d.alt} src={d.thumbnail} />
        ) : (
          <img className="post-thumbnail" alt={d.alt} src={d.thumbnail} />
        )
      ) : null}
    </div>
  );
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return { __html: doc.documentElement.textContent };
}
