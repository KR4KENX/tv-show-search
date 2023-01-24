window.onload = function(){
    showsApp.init();
}
function loadFromButton(){
    showsApp.loadData(showsApp.searchInput.value);
}
let showsApp = {
    data: null,
    searchInput: null,
    showsDataSection: null,
    init: function(){
        this.searchInput = document.querySelector("#search-input");
        this.searchInput.addEventListener("keyup",(e) => {
            if(e.key === "Enter"){
                
                this.loadData(this.searchInput.value);
            }
        });
        this.showsDataSection = document.querySelector(".shows-data-section");
        this.loadData("friends");
    },
    loadData: function(str){
        fetch("https://api.tvmaze.com/search/shows?q=" + str.trim())
        .then(response => response.json())
        .then(data => this.dataReady(data));
    },
    dataReady: function(showData){
        this.data = showData;
        
        let allBoxesHtml = "";
        
        if(showData.length > 0){
            for(let i=0; i < showData.length; i++){
                let show = showData[i];
                let score = show.score;
                show = show.show;

                let genres = show.genres.join(", ");
                
                let imgSrc = null;
                let imgSrcOriginal = null;
                if(show.image) {
                    imgSrc = show.image.medium;
                    imgSrcOriginal = show.image.original;
                } else{
                    imgSrc = "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png";
                    imgSrcOriginal = "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png";
                }

                let showTitle = null;
                if(!show.name) continue;
                showTitle = show.name;

                let summary = show.summary || "Description is missing";

                allBoxesHtml += this.getShowBoxByTemplate(imgSrc,showTitle,genres,summary);
            }

            this.showsDataSection.innerHTML = allBoxesHtml;
        }
        else{
            console.log("error")
        }
    },
    getShowBoxByTemplate: function(imgSrc, title, genres, overview){
        return `
        <div class="show-box">
            <img src="${imgSrc}" alt="">
            <div class="show-title">${title}</div>
            <div class="show-genres">${genres}</div>
            <div class="show-overview">${overview}</div>
        </div>`;
    }
};