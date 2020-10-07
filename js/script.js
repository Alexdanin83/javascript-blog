'use strict';
const titleClickHandler = function(){
     event.preventDefault();
     //console.log('Link was clicked!');
     //console.log(event);
/* [DONE] remove class 'active' from all article links  */
     const activeLinks = document.querySelectorAll('.titles a.active');
     for(let activeLink of activeLinks){
          activeLink.classList.remove('active');
     }
/* [DONE] add class 'active' to the clicked link */
     const clickedElement = this;
     //console.log('clickedElement (with plus): ' + clickedElement);
     clickedElement.classList.add('active');
/*[DONE] remove class 'active' from all articles */
     const activeArticles = document.querySelectorAll('article.active');
     for(let activeArticle of activeArticles){
     activeArticle.classList.remove('active');
     }
/*[DONE] get 'href' attribute from the clicked link */
     //console.log(clickedElement.getAttribute('href'));
     const getNameLink = clickedElement.getAttribute('href')
/*[DONE] find the correct article using the selector (value of 'href' attribute) */
     const targetArticle =  document.querySelector('article'+getNameLink)
     //console.log(targetArticle);
/*[DONE] add class 'active' to the correct article */
     targetArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
