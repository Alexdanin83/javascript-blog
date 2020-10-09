'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  articleId ='id';
function generateTitleLinks(){
     /*[DONE] remove contents of titleList */
     const titleList=document.querySelector(optTitleListSelector);
     titleList.innerHTML = '';
     /*[DONE] for each article */
     const articles = document.querySelectorAll(optArticleSelector);
     for(let article of articles){
          /*[DONE] get the article id */
          const articleName = article.getAttribute(articleId);
          /*[DONE] find the title element */
          /*[DONE] get the title from the title element */
          const articleTitle = article.querySelector(optTitleSelector).innerHTML;
          /*[DONE] create HTML of the link */
          const linkHTML = '<li><a href="#' + articleName+'"><span>' + articleTitle + '</span></a></li>';
          /*[DONE] insert link into titleList */
          titleList.insertAdjacentHTML('beforeend',linkHTML)
     }
}
generateTitleLinks();

const titleClickHandler = function() {
     event.preventDefault();
     /* [DONE] remove class 'active' from all article links  */
     const activeLinks = document.querySelectorAll('.titles a.active');
     for(let activeLink of activeLinks) {
          activeLink.classList.remove('active');
     }
     /* [DONE] add class 'active' to the clicked link */
     const clickedElement = this;
     clickedElement.classList.add('active');
     /*[DONE] remove class 'active' from all articles */
     const activeArticles = document.querySelectorAll('article.active');
     for(let activeArticle of activeArticles) {
          activeArticle.classList.remove('active');
     }
     /*[DONE] get 'href' attribute from the clicked link */
     const getNameLink = clickedElement.getAttribute('href')
     /*[DONE] find the correct article using the selector (value of 'href' attribute) */
     const targetArticle =  document.querySelector('article'+getNameLink)
     /*[DONE] add class 'active' to the correct article */
     targetArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
