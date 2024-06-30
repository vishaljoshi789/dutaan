"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function page() {
  let { baseURL, userInfo } = useContext(AuthContext);
  let [chatBox, setChatBox] = useState([]);
  let [chatBoxContent, setChatBoxContent] = useState([]);
  let scrollRef = useRef(null);
  let params = useSearchParams();
  const router = useRouter();
  let [chatid, setChatid] = useState(params.get("id"));
  let [proid, setProid] = useState(params.get("proid"));

  let api = useAxios();
  let getChatBox = async () => {
    let response = await api.get("/getChatBox/");
    console.log(response.data);
    setChatBox(response.data);
  };

  let scrollToBottom = () => {
    chatid != "null" && scrollRef.current.scrollIntoView(true);
  };

  let getChatBoxContent = async () => {
    // if (chatid && chatid != "null") {
    try {
      let response = await api.get(
        `/getChatBoxContent?id=${chatid}&proid=${proid}`
      );
      if (response.status == 200) {
        console.log(response.data);
        setChatBoxContent(response.data);
        setChatid(chatid);
        // getChatBox();
      }
    } catch (e) {
      toast.error("Something Went Wrong");
    }

    // }
  };
  let sendMessage = async (e) => {
    e.preventDefault();
    if (e.target.message.value.trim() != "") {
      let response = await api.post("/sendMessage/", {
        chat: e.target.chat.value,
        message: e.target.message.value,
      });
      if (response.status == 200) {
        getChatBoxContent();
        e.target.message.value = "";
      } else if (response.status == 400) {
        toast.error("Something went Wrong");
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatBoxContent]);

  useEffect(() => {
    getChatBoxContent();
    router.replace(`?proid=${proid}&id=${chatid}`);
  }, [chatid]);

  useEffect(() => {
    getChatBox();
    scrollToBottom();
    getChatBoxContent();
  }, []);
  return (
    <div>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">Chats</div>

          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            RA
          </div>
        </div>
        <div className="flex flex-row justify-between bg-white">
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {chatBox.map((item) => (
              <button
                onClick={() => {
                  setChatid(item.id);
                  setProid(item.product.id);
                }}
                className={`flex flex-row py-4 px-2 items-center border-b-2 ${
                  item.id == chatid ? `border-l-4 border-blue-400` : ""
                }`}
                key={item.id}
              >
                <div className="w-1/4">
                  <img
                    src={`${baseURL}${item.product.image}`}
                    className="object-cover h-10 w-10 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">
                    {item.product.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {chatid != "null" || proid != "null" ? (
            <div className="w-full px-5 flex flex-col justify-between">
              <ScrollArea>
                <div className="flex flex-col mt-5 h-[55vh]">
                  {chatBoxContent.map((item) => (
                    <div key={item.id}>
                      {userInfo.user.id == item.user ? (
                        <div className="flex justify-end mb-4">
                          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                            {item.message}
                          </div>
                          {/* <span
                          className="object-cover h-8 w-8 rounded-full text-white bg-red-500 flex justify-center items-center"
                          alt=""
                        >
                          ME
                        </span> */}
                        </div>
                      ) : (
                        <div className="flex justify-start mb-4">
                          {/* <span
                          className="object-cover h-8 w-8 rounded-full bg-green-500"
                          alt=""
                        ></span> */}
                          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                            {item.message}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
              <form className="py-5" onSubmit={sendMessage}>
                <input type="hidden" name="chat" defaultValue={chatid} />
                <input
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  name="message"
                  type="text"
                  placeholder="type your message here..."
                  defaultValue=""
                />
                <input type="submit" value="" />
              </form>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center font-bold">
              Start Your Conversation
            </div>
          )}

          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
