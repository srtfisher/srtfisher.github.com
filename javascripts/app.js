Handlebars.registerHelper('activityType', function(type) {
	switch(type) {
		case 'PullRequestReviewCommentEvent' :
		case 'IssueCommentEvent' :
		case 'CommitCommentEvent' :
			return 'Commented on a ';
			break;
		case 'CreateEvent' :
			return 'Created a ';
			break;
		case 'DeleteEvent' :
			return 'Deleted a ';
			break;
		case 'DownloadEvent' :
			return 'Created a download ';
			break;
		case 'FollowEvent' :
			return 'Followed ';
			break;
		case 'ForkEvent' :
			return 'Forked ';
			break;
		case 'ForkApplyEvent' :
			return 'Applied a fork ';
			break;
		case 'GistEvent' :
			return 'Gist: ';
			break;
		case 'GollumEvent' :
			return 'Gollum: ';
			break;
		case 'IssuesEvent' :
			return;
			break;
		case 'MemberEvent' :
			return 'Added ';
			break;
		case 'PublicEvent' :
			return 'Open Sourced ';
			break;
		case 'PullRequestEvent' :
			return '';
			break;

		case 'PushEvent' :
			return 'Pushed to ';
			break;
		case 'TeamAddEvent' :
			return '';
			break;
		case 'WatchEvent' :
			return 'Watched ';
			break;

		case 'ReleaseEvent' :
			return 'Created a ';
			break;
		default :
			return '';
			break;
	}
});

Handlebars.registerHelper('activityReciever', function(data) {
	switch(data.type) {
		case 'PullRequestReviewCommentEvent' :
		case 'IssueCommentEvent' :
		case 'CommitCommentEvent' :
			r = 'Commented on a ';
			break;
		case 'CreateEvent' :
			r = data.payload.ref_type+' called <strong>'+data.payload.ref+'</strong> on <a href="http://github.com/'+data.repo.name+'">'+data.repo.name+'</a>';
			break;
		case 'DeleteEvent' :
			r = 'Deleted a ';
			break;
		case 'DownloadEvent' :
			r = 'Created a download ';
			break;
		case 'FollowEvent' :
			r = '<a href="http://github.com/'+data.payload.target.login+'">'+data.payload.target.name+'</a>';
			break;
		case 'ForkEvent' :
			r = '<a href="http://github.com/'+data.payload.forkee.full_name+'">'+data.repo.name+'</a>';
			break;
		case 'ForkApplyEvent' :
			r = 'Applied a fork ';
			break;
		case 'GistEvent' :
			r = '<a href="'+data.payload.gist.html_url+'">'+data.payload.gist.html_url+'</a>';
			break;
		case 'ReleaseEvent' :
			r = '<a href="'+data.payload.release.html_url+'">'+data.payload.release.name+'</a> '
				+'<a href="http://github.com/'+data.repo.name+'">'+data.repo.name+'</a>';
			break;
		case 'GollumEvent' :
			r = 'Gollum: ';
			break;
		case 'IssuesEvent' :
			r = '';
			break;
		case 'MemberEvent' :
			r = 'Added ';
			break;
		case 'PublicEvent' :
			r = 'Open Sourced ';
			break;
		case 'PullRequestEvent' :
			r = '<strong>'+capitaliseFirstLetter(data.payload.action)+'</strong> a <a href="'+data.payload.pull_request.html_url+'">pull request</a> on '
			+'<a href="http://github.com/'+data.repo.name+'">'+data.repo.name+'</a>';
			break;

		case 'WatchEvent' :
		case 'PushEvent' :
			r = '<a href="http://github.com/'+data.repo.name+'">'+data.repo.name+'</a>';
			break;
		case 'TeamAddEvent' :
			r = '';
			break;
		
		default :
			r = '';
			break;
	}

	return new Handlebars.SafeString(r);
});

$(document).ready(function() {
	$.getJSON('/repos.json', function(data)
	{
		var source = $('#project-template').html();
		template = Handlebars.compile(source);
		$('#project-listing').html(template(data));
	});

	$.getJSON('https://api.github.com/users/srtfisher/events?callback=?', function(data)
	{
		console.log(data);
		template = Handlebars.compile($('#activity-template').html());
		$('#activity-listing').html(template(data));
	});
});

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}