import Markdown from 'react-markdown'

import { useContext } from 'react';
import HomePageContext from '../context/HomePageContext';
import { FaReply } from "react-icons/fa";

const baseURL = process.env.REACT_APP_BASE_URL || '/api'; // 如果环境变量未设置，提供一个默认值



const MessageComp = ({ message }) => {
    return (
            <div className='box'>
                {message.role === "user"?( 
                    
                        <article className="media">
                            <figure className="media-left">
                                <p className="image is-64x64 is-1by1">
                                    <img className='is-rounded' src={`${baseURL}${message.iconUrl}`} alt={message.name} />
                                </p>
                            </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{message.name}</strong> <small></small> <small></small>
                                    <br />
                                    {message.content}
                                </p>
                            </div>
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <div class="level-item">
                                        <span class="icon is-small">
                                            <i class="fas fa-reply"></i>
                                        </span>
                                    </div>
                                    <div class="level-item">
                                        <span class="icon is-small">
                                            <i class="fas fa-retweet"></i>
                                            </span>
                                    </div>
                                    <div class="level-item">
                                        <span class="icon is-small">
                                            <i class="fas fa-heart"></i>
                                        </span>
                                    </div>
                                </div>
                            </nav>
                    </div>
                </article>
                ):(
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64 is-1by1">
                            <img className='is-rounded' 
                            src={`${baseURL}${message.iconUrl}`}  alt={message.name} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{message.name}</strong> <small></small> <small></small>
                                <br />
                                {message.content}
                            </p>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <span class="icon is-small">
                                        
                                    </span>
                                </div>
                                <div class="level-item">
                                    <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                                </div>
                                <div class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </article>
                    
        )}
    </div>
    )
}

export default MessageComp