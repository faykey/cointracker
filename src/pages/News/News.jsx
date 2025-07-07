import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredSource, setFilteredSource] = useState("All");
    const [query, setQuery] = useState("crypto");

    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
    const endpoint = `https://gnews.io/api/v4/search?q=crypto&lang=en&token=${API_KEY}`;


    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const res = await fetch(endpoint);
                const data = await res.json();
                setArticles(data.articles || []);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [query]);

    const sources = ["All", ...new Set(articles.map((a) => a.source.name))];

    const displayedArticles =
        filteredSource === "All"
            ? articles
            : articles.filter((a) => a.source.name === filteredSource);

    return (
        <div className="news-container">
            <h1 className="news-title">Latest Crypto News</h1>

            <div className="news-controls">
                <select
                    value={filteredSource}
                    onChange={(e) => setFilteredSource(e.target.value)}
                    className="news-filter"
                >
                    {sources.map((source, i) => (
                        <option key={i} value={source}>
                            {source}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="news-loading">Loading articles...</p>
            ) : displayedArticles.length === 0 ? (
                <p className="news-loading">No articles found.</p>
            ) : (
                <div className="news-grid">
                    {displayedArticles.map((article, index) => (
                        <a
                            key={index}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-card"
                        >
                            {article.image && (
                                <img src={article.image} alt={article.title} className="news-img" />
                            )}
                            <h2 className="news-headline">{article.title}</h2>
                            <p className="news-description">{article.description}</p>
                            <span className="news-meta">
                                {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
