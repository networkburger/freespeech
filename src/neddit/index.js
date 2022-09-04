import "./neddit.css";
import React, { useState, useRef, useEffect } from "react";
import icon from "../svg-icons";

const urlParams = new URLSearchParams(window.location.search);

export function NedditApp() {
  const sub = urlParams.get("r") ?? "popular";
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
  "holup",
  "maybemaybemaybe",
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
              <button key={p} onClick={() => goToSub(p)}>
                {p}
              </button>
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
