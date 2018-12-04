const lineSeperator = function(content,lineRequired = 10){
 let result = content.split('\n').slice(0,lineRequired);
 return result.join('\n');
};


module.exports = {lineSeperator};

