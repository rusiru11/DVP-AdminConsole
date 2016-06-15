/**
 * Created by Rajinda on 6/13/2016.
 */

mainApp.directive("navigationtree", function ($filter, appAccessManageService) {

    return {
        restrict: "EA",
        scope: {
            navigation: '=',
            selectedConsole: '=',
            userName: '@?',
            consoleName: '@?'
        },

        templateUrl: 'application_access_management/view/template/navigationTree.html',


        link: function (scope, element, attributes) {

            scope.vm = {};
            scope.vm.expandAll = expandAll;

            scope.vm.data = newItem(0, scope.navigation.navigationName);

            var items = $filter('filter')(scope.selectedConsole.consoleNavigation.saveItem, {menuItem: scope.navigation.navigationName})

            /*Generate tree*/
            var id = 1;
            angular.forEach(scope.navigation.resources, function (resource) {
                var item1 = addChild(scope.vm.data, resource.scopeName, resource.feature);


                id++;
                var read = addChild(item1, id, "Read");
                id++;
                var write = addChild(item1, id, "Write");
                id++;
                var del = addChild(item1, id, "Delete");
                if (items) {
                    var optionSelected = false;
                    angular.forEach(items[0].menuAction, function (action) {
                        read.isSelected = action.read;
                        write.isSelected = action.write;
                        del.isSelected = action.delete;
                        optionSelected = action.read ? true : (action.write ? true : action.delete)
                    });
                    if (optionSelected) {
                        item1.isSelected = true;
                        scope.vm.data.isSelected = true;
                    }
                }
            });

            /*scope.vm.expandAll(scope.vm.data);*/

            function newItem(id, name) {
                return {
                    id: id,
                    name: name,
                    children: [],
                    isExpanded: false,
                    isSelected: false,
                };
            }

            function addChild(parent, id, name) {
                var child = newItem(id, name);
                child.parent = parent;
                parent.children.push(child);
                return child;
            }

            function expandAll(root, setting) {
                if (!setting) {
                    setting = !root.isExpanded;
                }
                root.isExpanded = setting;
                root.children.forEach(function (branch) {
                    expandAll(branch, setting);
                });
            }

            scope.updateNavigation = function (navigationData) {
                var editedMenus = {};
                editedMenus = {
                    "menuItem": navigationData.name,//"navigationName": "ARDS_CONFIGURATION",
                    "menuAction": []
                };
                angular.forEach(navigationData.children, function (menu) {
                    var data = {};
                    data = {
                        "Navigatione": menu.id,//"scopeName": "requestmeta",
                        "read": menu.children["0"].isSelected,
                        "write": menu.children["1"].isSelected,
                        "delete": menu.children["2"].isSelected,
                    };
                    editedMenus.menuAction.push(data);
                });

                appAccessManageService.AddSelectedNavigationToUser(scope.userName, scope.consoleName, editedMenus).then(function (response) {
                    if (response) {
                        scope.showAlert("Info", "Info", "ok", "Successfully Updated.")
                    }
                    else {
                        scope.showAlert("Error", "Error", "ok", "Fail To Update.");
                    }

                }, function (error) {
                    scope.showAlert("Error", "Error", "ok", "There is an error ");
                });
            }

            scope.showAlert = function (tittle, label, button, content) {

                new PNotify({
                    title: tittle,
                    text: content,
                    type: 'notice',
                    styling: 'bootstrap3'
                });
            };

        }

    }
});