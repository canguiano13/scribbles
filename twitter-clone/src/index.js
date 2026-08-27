import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//listen for any click on document
document.addEventListener("click", function(e){
    //listen for likes on tweets
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    //listen for retweets
    else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    //listen for replies
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    //add tweet
    else if(e.target.id == "tweet-btn"){
        handleTweetBtnClick()
    }
});

//increment/decrement like 
function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter((twt) => (twt.uuid == tweetId))[0]
    targetTweetObj.likes = (!targetTweetObj.isLiked) ? (targetTweetObj.likes+1) : (targetTweetObj.likes-1);

    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render()
}

//increment/decrement retweet
function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter((twt) => (twt.uuid == tweetId))[0]
    targetTweetObj.retweets = (!targetTweetObj.isRetweeted) ? (targetTweetObj.retweets+1) : (targetTweetObj.retweets-1);

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render()
}

//hide/unhider replies
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

//add tweet to feed
function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input");
    if (tweetInput.value.length > 0){
        //create new tweet object
        let newTwt = {
            handle: "@cang",
            profilePic: "images/scrimbalogo.png",
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }
        //add to feed
        tweetsData.unshift(newTwt);
        render();

        //reset input
        tweetInput.value = ""
    }
}

//transform stored tweets into html divs
function getFeedHtml(){
    let feedHtml = ""

    tweetsData.forEach(function(tweet){
        let likeIconClass = (tweet.isLiked) ? "liked" : "";
        let retweetIconClass = (tweet.isRetweeted) ? "retweeted" : "";

        let repliesHtml = ""
        //check for replies on a tweet
        if (tweet.replies.length > 0){
            for (let reply of tweet.replies){
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
            }
        }

        //add next tweet to feed
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic"/>
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail ${retweetIconClass}">
                            <i class="fa-solid fa-retweet"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>
                </div>
            </div>
            <div id="replies-${tweet.uuid}" class="hidden">
                ${repliesHtml}
            </div>
        </div>`

    })
    return feedHtml;
}

function render(){
    document.getElementById("feed").innerHTML = getFeedHtml();
}

//render other tweets
render()
