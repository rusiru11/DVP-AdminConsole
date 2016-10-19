/**
 * Created by Rajinda on 10/11/2016.
 */

mainApp.factory("socialConnectorService", function ($http,authService,baseUrls) {

    var addFacebookPageToSystem = function (postData) {
        return $http({
            method: 'POST',
            url: baseUrls.socialConnectorUrl+"Facebook",
            data:postData
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return false;
            }
        });
    };

    var getFacebookAccounts = function () {
        return $http({
            method: 'GET',
            url: baseUrls.socialConnectorUrl+"Facebook/accounts",
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return undefined;
            }
        });
    };

    var deleteFacebookAccount = function (id) {
        return $http({
            method: 'DELETE',
            url: baseUrls.socialConnectorUrl+"Facebook/"+id
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.IsSuccess;
            } else {
                return false;
            }
        });
    };

    var activateFacebookAccount = function (id,postData) {
        return $http({
            method: 'PUT',
            url: baseUrls.socialConnectorUrl+"Facebook/"+id,
            data:postData
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.IsSuccess;
            } else {
                return false;
            }
        });
    };

    var updatePagePicture = function (id,postData) {
        return $http({
            method: 'PUT',
            url: baseUrls.socialConnectorUrl+"Facebook/"+id+"/picture",
            data:postData
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.IsSuccess;
            } else {
                return false;
            }
        });
    };

    return {
        AddFacebookPageToSystem:addFacebookPageToSystem,
        GetFacebookAccounts:getFacebookAccounts,
        DeleteFacebookAccount:deleteFacebookAccount,
        UpdatePagePicture:updatePagePicture,
        ActivateFacebookAccount:activateFacebookAccount,
    }

});

