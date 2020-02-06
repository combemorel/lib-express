
function sanitizedText(str) {
	const patt = /\<.*?\>/g;

	const result = str.replace(patt, ' ');
	return result;
}

export const formatFrontArticle = article => {
	const {
		id,
		title,
		content,
		id_Author,
		date,
		author
	} = article;
	const datetmp = new Date(date)
	const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour:'2-digit' ,minute:'2-digit' , second:'2-digit'  };
	// const dateFormat = datetmp.toLocaleDateString("fr-FR","weekday", "year", "month", "day", "hour", "minute")
	const dateFormat = datetmp.toLocaleString("fr-FR",options)
	return {
		id,
		title: unescape(title),
		content: sanitizedText(unescape(content)),
		id_Author: id_Author,
		date: dateFormat,
		author: author.charAt(0).toUpperCase()+author.substring(1).toLowerCase()
	};
};

export const formatFrontArticleTab = article => {
	const {
		id,
		title,
		content,
		id_user,
		date
	} = article;
	return {
		id,
		title: unescape(title),
		content: sanitizedText(unescape(content)).substring(0, 200),
		author: id_user,
		date
	};
};

