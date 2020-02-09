import dateformat from 'dateformat'

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

	return {
		id,
		title: unescape(title),
		content: sanitizedText(unescape(content)),
		id_Author: id_Author,
		date: dateformat(date,"dd/mm/yyyy HH:MM:ss"),
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

export const formatArticle = article => {
	const { id, title, content, id_user, date } = article;
	return { id, title: unescape(title), content: unescape(content), author: id_user, date };
};
