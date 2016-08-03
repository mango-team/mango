setTimeout(function() {
    var proGroup = localStorage.getItem('last-pro-group');
    if (proGroup) {
        var groups = JSON.parse(localStorage.getItem('groups-temp'));
        
        if (groups && groups.visited && groups.visited.indexOf(proGroup) > -1) {
            groups.visited.splice(groups.visited.indexOf(proGroup), 1);
            localStorage.setItem('groups-temp', JSON.stringify(groups));
        }
        
        var pro = localStorage.getItem('last-pro');
        if (pro) {
            var group = JSON.parse(localStorage.getItem(proGroup));
            
            if (group && group.visited && group.visited.indexOf(pro) > -1) {
                group.visited.splice(group.visited.indexOf(pro), 1);
                localStorage.setItem(proGroup, JSON.stringify(group));
            }
        }
    }

    location.reload(true);
}, 6000);