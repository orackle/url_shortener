"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion"

export default function ShortenExpress() {
    const [submitted, setSubmitted] = useState(false);
    const [urlValue, setUrlValue] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: urlValue }),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setShortenedUrl(data.new_url);
                setError('');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while processing your request.');
        }
    };

    const handleRedirect = async () => {
        try {
            const response = await fetch(`/api/redirect?url=${shortenedUrl}`);
            const data = await response.json();
            if (response.ok) {
                window.location.href = data.original_url;
            } else {
                console.error('Error:', data.error);
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);

    }
    
    return (
        <motion.div className="absolute w-1/2 h-1/2 left-1/4 top-1/4 transform -translate-y-1/2 flex flex-col " animate={{opacity:1, y:0}} initial={{opacity:0, y:-100}} transition={{ duration: 0.9 }}>
            <h1 className="text-white font-extrabold text-6xl mt-8">Shorten It.</h1>
            <h3 className="text-gray-400 font-extrabold text-md">A minimal URL shortener.</h3>
            <form className="flex mt-8">
            {shortenedUrl ? (
                <div className="relative w-full flex flex-col">
                    <div className='w-full flex flex-row'>
                    <input
                        type="text"
                        id="url"
                        value={shortenedUrl}
                        className="p-3 w-2/3 rounded-md bg-black shadow-sm border border-gray-300 mr-2 cursor-pointer"
                        readOnly // Make the input field read-only
                        title="Click to go to the original URL"
                        onClick={handleRedirect}
                    />
                    <button
                        type="button"
                        className="p-3 w-1/3 rounded-md bg-white text-gray-900 shadow-sm border border-gray-300"
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    </div>
                    <motion.div className="text-white mt-2" animate={{opacity:1}} initial={{opacity:0}} transition={{ duration: 2 }}>Your brand new short link just dropped! Give it a spin.</motion.div>
                </div>
                    
                ) : (
                    <>
                        <input
                            type="text"
                            id="url"
                            value={urlValue}
                            onChange={(e) => setUrlValue(e.target.value)}
                            placeholder="Enter a URL"
                            className="p-3 w-full rounded-md bg-black shadow-sm border border-gray-300 mr-2"
                        />
                        <button
                            type="button"
                            className="p-3 w-1/3 rounded-md bg-white text-gray-900 shadow-sm border border-gray-300"
                            onClick={handleSubmit}
                        >
                            Shorten ➜
                        </button>
                    </>
                )}
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </motion.div>
    );
 }