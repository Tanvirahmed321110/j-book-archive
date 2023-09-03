const focusAndBlurF = (id)=>{
    const focus = document.getElementById(id).addEventListener('focus',()=>{
        document.body.style.backgroundColor = 'rgb(209, 209, 206)'
    })
    const blur = document.getElementById(id).addEventListener('blur',()=>{
        document.body.style.backgroundColor='white'
    })
}
focusAndBlurF('input-search');

// toggle spinner
const toggleSpinnerF = (showOrHide) =>{
    document.getElementById('spinner').style.display=showOrHide
}
const toggleDisplayF = (showOrHide) =>{
    document.getElementById('main').style.display = showOrHide;
}

// handelar 
const searchHandelar = ()=>{
    const searchInputFrield = document.getElementById('input-search')
    const searchText = searchInputFrield.value;
    if(searchText === ''){
        alert("please search name of books");
    }
    
    // api
    else{
        
        toggleDisplayF('none');
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res=>res.json())
        .then(data=>displaySerchResultF(data.docs))
        
        // spinner 
        toggleSpinnerF('block');
    }
    
    // clear input frield
    searchInputFrield.value = ''
}

const displaySerchResultF = (items) =>{
    if(items.length == []){
        toggleSpinnerF('none');
        document.getElementById('data-not-found').style.display='block';
    }
    else {
        
        toggleDisplayF('block')
        document.getElementById('data-not-found').style.display='none';
        const itemContainer = document.getElementById('items-containers');
        
        itemContainer.textContent = '';
        const totalResult = items.length;
        const p = document.createElement('p');
        p.classList.add('item')
        p.innerText = `Total Get : ${totalResult}`;
        itemContainer.appendChild(p)
        
        for(const item of items){
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <h3>Book Name :${item.title}</h3>
                <h4>Author : ${item.author_name}</h4>
                <p>Publish : ${item.publish_date}</p>
            `
            itemContainer.appendChild(div)
            console.log(item);
            toggleSpinnerF('none');
        }
    }
}