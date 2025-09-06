

 const newsContainer=document.getElementById('newsContainer');
 const  bookMarkContainer=document.getElementById('bookMarkConatiner');

 let bookMarks=[ ];

const loadCategory=()=>{
    fetch(`https://news-api-fs.vercel.app/api/categories`)
    .then(res=>res.json())
    .then(json=>displayCategory(json.categories)
)
.catch((err) => {
  
    
})
}




const displayCategory=(categories)=>{
    // console.log(categories);
    
    const levelContainer=document.getElementById('Categories-container')
    levelContainer.innerHTML='';

    categories.forEach(category => {
        // console.log(category);
        const categoryBox=document.createElement('div');
        categoryBox.innerHTML=`
                 <li id=${category.id} class="hover:border-b-4 hover:border-b-red-500 cursor-pointer">${category.title}</li>
                 `
        levelContainer.append(categoryBox)
    });

    levelContainer.addEventListener('click',(e)=>{
         showLoading();
        const allLi=document.querySelectorAll('li')
        // console.log(allLi);
            allLi.forEach(li =>{
                li.classList.remove('border-b-4')
            })
        
        if (e.target.localName=== 'li') {
        
         e.target.classList.add('border-b-4')

                  loadNewsByCategory(e.target.id);
        }


    })

};

const loadNewsByCategory=(newsId)=>{
    const url=` https://news-api-fs.vercel.app/api/categories/${newsId}`
    fetch(url)
    .then((res)=>res.json())
    .then(res=>displayNewsCategory(res.articles)
    )
    .catch(err=>{
         showError();
    })
}

const displayNewsCategory=(articles
)=>{
//     console.log(articles
// );
   //কেতাগরি খালি থাকলে
   if (articles.length === 0) {
    showEmptyMessage()
    return;
   }
    newsContainer.innerHTML='';

    articles.forEach((article)=>{
     newsContainer.innerHTML+=`
        <div class='border border-gray-300 rounded-lg'>
        <div>
        <img src="${article.image.srcset[5].url}"/>
        </div>
        <div id=${article.id} class='p-2'>
        <h1 class='font-bold text-2xl '>${article. title}</h1>
        <p>${article.time}</p>
        <button class='btn'>Bookmark</button>
        </div>

        
        </div>
        
        `
    })
  
}
//***********book marks add**********************************************///
newsContainer.addEventListener('click',(e) =>{
   
    if (e.target.innerText==='Bookmark') {
   handleBookmarks(e)
        
    }
})



const handleBookmarks=(e)=>{
    const title = e.target.parentNode.children[0].innerText;
    const id = e.target.parentNode.id;

    if(bookMarks.some(bookMark => bookMark.id === id)){
        alert("Already bookmarked!");
        return;
    }

    bookMarks.push({ title, id });
    
    showBookmarks(bookMarks);
}

const showBookmarks=(bookMarks)=>{
    bookMarkContainer.innerHTML='';
    bookMarks.forEach(bookMark=>{
        bookMarkContainer.innerHTML+=`
        
        <div class='border my-2 p-1'>
        <h1>${bookMark.title}
        </h1>
        <button onclick="handleDeleteBookmark('${bookMark.id}')" class='btn mt-1'> Delete
        </button>
        </div>
        
        `
    })
}



const handleDeleteBookmark=(bookmarkId)=>{
    // console.log(bookmarkId);
    const filterBookMark= bookMarks.filter(bookMark =>bookMark.id!== bookmarkId);
    // console.log(filterBookMark);
    bookMarks=filterBookMark;
    showBookmarks(filterBookMark);
    // console.log(filterBookMark);
    
}


const showLoading=()=>{
    newsContainer.innerHTML=`
      <div class="max-w-7xl mx-auto">
   <span class="loading loading-spinner loading-xl "></span>
   </div>
    `
}

const showError=()=>{
    newsContainer.innerHTML=`
   

    <div role="alert" class="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Something is error!</span>
</div>
    `
}
const showEmptyMessage=()=>{
     newsContainer.innerHTML=`
    <div><h1>No news found</h1></div>
    `
}


loadCategory();
loadNewsByCategory('main')