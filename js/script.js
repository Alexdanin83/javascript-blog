'use strict';
const opts = {
  tagSizes: {
    optCloudClassCount: 4,
    classPrefix: 'tag-size-',
  },
  select: {
    optArticleSelector: '.post',
    optTitleSelector: '.post-title',
    optTitleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    optTagsListSelector: '.tags.list',
    articleId: 'id',
    articleTags: 'data-tags',
    autorsTags: 'data-author',
    autorInArticle: '.post-author',
  },
};

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
  const titleList=document.querySelector(opts.select.optTitleListSelector);
  titleList.innerHTML = '';
  /*[DONE] for each article */
  const articles = document.querySelectorAll(opts.select.optArticleSelector+customSelector);
  for(let article of articles){
    /*[DONE] get the article id */
    const articleName = article.getAttribute(opts.select.articleId);
    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(opts.select.optTitleSelector).innerHTML;
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
  const articles = document.querySelectorAll(opts.select.optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    // 1 sposób
    const tags= article.getAttribute(opts.select.articleTags);
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
    const tagsList = article.querySelector(opts.select.articleTagsSelector);
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

const generateAuthors = function() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.select.optArticleSelector);
  const autorByArticles = document.querySelectorAll(opts.select.autorInArticle);
  const autorTitle = document.querySelector('.authors');
  //  for(let autorByArticle of autorByArticles){
  var i = 0;
  for(let article of articles){
    /*[DONE] get the article id */
    const autorName = article.getAttribute(opts.select.autorsTags);
    if(!allTags[autorName]) {
      allTags[autorName] = 1;
    }
    else {
      allTags[autorName]++;
    }
    /*[DONE] insert link into titleList */
    autorByArticles[i].innerHTML='by '+autorName;
    i++;
  }
  var allTagsHTML='';
  for(let tag in allTags){
    allTagsHTML += '<li><a href="#tag1-author-' + tag + '"><span>'+ tag +'(' + allTags[tag] + ')</span></a></li>';
  }
  autorTitle.insertAdjacentHTML('beforeend',allTagsHTML);
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
  const tag = href.replace('#tag1-author-', '');
  /* find all tag links with class active */
  const tagActives = document.querySelectorAll('a.active[href^="#tag1-author-"]');
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
  const autorsTags = document.querySelectorAll('a[href^="#tag1-author-"]');
  for(let autorsTag of autorsTags) {
    /* add tagClickHandler as event listener for that link */
    autorsTag.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

function calculateTagClass(tag, params){
  let classNumber = Math.floor( ( (tag - params.min) / (params.max - params.min) ) * opts.tagSizes.optCloudClassCount +1 );
  return opts.tagSizes.classPrefix + classNumber;
}

function calculateTagsParams(tags) {
  var i = 0;
//  var params_min = tags[0];
  var return_params = {};
  for(let tag in tags){
    if (i==0) {
    var  params_min=tags[tag];
    var  params_max=tags[tag];
    }
    if(tags[tag] > params_max){
      params_max = tags[tag];
    }
    if(tags[tag] <  params_min){
      params_min = tags[tag];
    }
    i++;
  }
  return_params['max'] = params_max;
  return_params['min'] = params_min;
  return return_params;
}

function generateTagsR(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.select.optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const tags= article.getAttribute(opts.select.articleTags);
    /* make html variable with empty string */
    //var linkHTML='';
    /* get tags from data-tags attribute */
    const articleTagsArray = tags.split(' ');
    /* split tags into array */
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      //linkHTML = linkHTML + '<li><a href="#tag-' + tag+'"><span>' + tag + '</span></a></li>';
      //linkHTML = '<li><a href="#tag-' + tag+'"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      /* [NEW] check if this link is NOT already in allTags */
      //if(allTags.indexOf(linkHTML) == -1){
      /* [NEW] add generated code to allTags array */
      //allTags.push(linkHTML);
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }

    }
  }
  /* END LOOP: for each tag */
  /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  //Długość objiektu
  //const countR = Object.keys(allTags).length;
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a class="'+tagLinkHTML+'" href="#tag-' + tag + '"><span>'+ tag +'(' + allTags[tag] + ')</span></a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTagsR()

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
