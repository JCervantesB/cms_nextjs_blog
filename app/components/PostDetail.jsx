"use client";

import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { BsCalendar2Event } from "react-icons/bs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const PostDetail = ({ post }) => {
  const [copied, setCopied] = useState(false);
  function handleCopy(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error al copiar el texto:", error));
  }

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }

      if (obj.code) {
        modifiedText = (
          <pre
            key={index}
            className="bg-gray-900 text-neutral-300 p-4 relative rounded-lg"
          >
            <code>{text}</code>
          </pre>
        );
      }
      if (obj.href) {
        modifiedText = (
          <a
            key={index}
            href={obj.href}
            className="text-blue-500 font-semibold"
          >
            {obj.children.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </a>
        );
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text
                  ? getContentFragment(i, item.text, item)
                  : item}
              </React.Fragment>
            ))}
          </p>
        );
      case "link":
        return (
          <a key={index} href={obj.href} className="text-blue-500">
            {obj.children.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </a>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </h4>
        );
      case "heading-five":
        return (
          <h5 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </h5>
        );
      case "block-quote":
        return (
          <blockquote
            key={index}
            className="text-md font-light italic mb-4 ml-2 px-1 border-l-2 border-rose-500"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                {item && item.text ? item.text : item}
              </React.Fragment>
            ))}
          </blockquote>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="m-auto"
          />
        );
      case "code-block":
        return (
          <pre
            key={index}
            className="bg-gray-900 text-neutral-300 p-2 relative rounded-lg mb-4 text-sm"
          >
            <SyntaxHighlighter language="javascript" style={materialDark}>{text}</SyntaxHighlighter>
            <button
              onClick={() => handleCopy(text)}
              className="absolute top-2 right-2 px-2 py-1 rounded-md bg-gray-800 text-neutral-300 text-sm "
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </pre>
        );
      case "bulleted-list":
        return (
          <ul key={index} className="list-disc mb-8 pl-8">
            {modifiedText.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="shadow-xl p-4 md:p-8 mb-8 bg-black bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white text-sm md:text-base">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post?.imagenDestacada.url}
          alt={post?.titulo}
          className="object-top h-full w-full object-cover shadow-xl rounded-t-xl lg:rounded-xl"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex flex-wrap md:flex-nowrap justify-center lg:justify-end mb-8 w-full">
          <div className="flex flex-wrap mb-4 md:mb-0 lg:w-auto">
            <img
              alt={post?.autor.nombre}
              height="30px"
              width="30px"
              className="align-middle rounded-full object-cover"
              src={post?.autor.avatar.url}
            />
            <p className="inline align-middle text-neutral-300 ml-2 text-sm md:text-lg font-normal">
              {post?.autor.nombre}
            </p>
          </div>
          <div className="flex flex-wrap text-neutral-300 ml-2 text-sm md:text-lg">
            <p>
              <span>
                <BsCalendar2Event
                  className="inline align-middle text-rose-500"
                  size={22}
                />{" "}
              </span>
              {moment(post?.createdAt).format("DD MMMM YYYY")}
            </p>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold text-rose-500">
          {post?.titulo}
        </h1>
        {post?.contenido.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
