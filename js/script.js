'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  articleId = 'id',
  articleTags = 'data-tags',
  autorsTags = 'data-author',
  autorInArticle = '.post-author';

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
  const getNameLink = clickedElement.getAttribute('href');
  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle =  document.querySelector('article'+getNameLink);
  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const generateTitleLinks = function(customSelector = '') {
  /*[DONE] remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector+customSelector);
  for(let article of articles){
    /*[DONE] get the article id */
    const articleName = article.getAttribute(articleId);
    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*[DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleName+'"><span>' + articleTitle + '</span></a></li>';
    /*[DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend',linkHTML);
  }
  //Dodajemy handler do każdego linku artukuła po lewej stronie
  const links = document.querySelectorAll('.titles a');
  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks()

const generateTags = function() {
  /* find all articles */
  //const arrayTags = [];
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    // 1 sposób
    const tags= article.getAttribute(articleTags);
    //  for(let i = 0; i < tags.length; i++) {
    //    arrayTags[i]=tags.split(" ");
    //  }
    /*split tags into array */
    //2 sposób
    const articleTagsArray = tags.split(' ');
    /* for each tag */
    var html='';
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      html = html + '<li><a href="#tag-' + tag+'"><span>' + tag + '</span></a></li>';
      /* add generated code to HTML variable */
    }
    const tagsList = article.querySelector(optArticleTagsSelector);
    /* insert HTML of all the links into the tags wrapper */
    tagsList.insertAdjacentHTML('beforeend',html);
    /* END LOOP: for each tag */
  }
}
generateTags()

const tagClickHandler = function(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagActive of tagActives) {
    /* END LOOP: for each active tag link */
    tagActive.classList.remove('active');
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

const addClickListenersToTags = function() {
  /* find all links to tags */
  /* START LOOP: for each link */
  const linksTags = document.querySelectorAll('a[href^="#tag-"]');
  for(let linksTag of linksTags) {
    /* add tagClickHandler as event listener for that link */
    linksTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags()

const generateAuthors = function() {
  const articles = document.querySelectorAll(optArticleSelector);
  const autorByArticles = document.querySelectorAll(autorInArticle);
  const autorTitle = document.querySelector('.authors');
  //  for(let autorByArticle of autorByArticles){
  var i = 0;
  for(let article of articles){
    /*[DONE] get the article id */
    const autorName = article.getAttribute(autorsTags);
    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    /*[DONE] create HTML of the link */
    const linkHTML = '<li><a href="#tag-autor-' + autorName+'"><span>' + autorName + '</span></a></li>';
    /*[DONE] insert link into titleList */
    autorTitle.insertAdjacentHTML('beforeend',linkHTML);
    autorByArticles[i].innerHTML='by '+autorName;
    i++;
  }
}
generateAuthors()

const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-autor-', '');
  /* find all tag links with class active */
  const tagActives = document.querySelectorAll('a.active[href^="#tag-autor-"]');
  /* START LOOP: for each active tag link */
  for(let tagActive of tagActives) {
    /* END LOOP: for each active tag link */
    tagActive.classList.remove('active');
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

const addClickListenersToAuthors = function(){
  const autorsTags = document.querySelectorAll('a[href^="#tag-autor-"]');
  for(let autorsTag of autorsTags) {
    /* add tagClickHandler as event listener for that link */
    autorsTag.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
