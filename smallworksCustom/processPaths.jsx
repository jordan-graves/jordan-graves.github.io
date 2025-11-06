/**
 * processPaths.jsx
 * Updated workflow for Illustrator automation
 * - Uses "simplify menu item"
 * - Groups before Intersect
 * - Expands appearance (no ungroup)
 */

(function() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;
    var layer = doc.layers[0]; // Layer 1

    // Select all and ungroup twice
    app.executeMenuCommand("selectall");
    app.executeMenuCommand("ungroup");
    app.executeMenuCommand("ungroup");

    // Collect path items in Layer 1
    var paths = [];
    for (var i = 0; i < layer.pageItems.length; i++) {
        if (layer.pageItems[i].typename === "PathItem") {
            paths.push(layer.pageItems[i]);
        }
    }

    if (paths.length < 7) {
        alert("Expected at least 7 paths in Layer 1.");
        return;
    }

    // Select 1st, 3rd, and 5th path, simplify, then outline stroke
    var simplifyIndexes = [0, 2, 4];
    doc.selection = null;
    for (var j = 0; j < simplifyIndexes.length; j++) {
        paths[simplifyIndexes[j]].selected = true;
        app.executeMenuCommand("simplify menu item");
        app.executeMenuCommand("OffsetPath v22");
        doc.selection = null;
    }

         paths = [];
    for (var i = 0; i < layer.pageItems.length; i++) {
        if (layer.pageItems[i].typename === "PathItem" || layer.pageItems[i].typename === "CompoundPathItem") {
            paths.push(layer.pageItems[i]);
        }
    }

    if (paths.length < 7) {
        alert("Expected at least 7 paths in Layer 1.");
        return;
    }

    // Helper: group two items, intersect, expand (keep grouped)
    function groupAndIntersect(itemA, itemB) {
        // Group the two items
        doc.selection = null;
        itemA.selected = true;
        itemB.selected = true;
        app.executeMenuCommand("group");

        // The new group becomes the active selection
        app.executeMenuCommand("Live Pathfinder Intersect");
        app.executeMenuCommand("expandStyle");
        doc.selection = null;
    }

    // Perform group + intersect for pairs (1&2), (3&4), (5&6)
    groupAndIntersect(paths[4], paths[5]);
     groupAndIntersect(paths[2], paths[3]);
     groupAndIntersect(paths[0], paths[1]);



    // Recollect all path items (some may have been replaced)
    var resultPaths = [];
    for (var k = 0; k < layer.pageItems.length; k++) {
        if (layer.pageItems[k].typename === "PathItem" || layer.pageItems[k].typename === "GroupItem") {
            resultPaths.push(layer.pageItems[k]);
        }
    }

    // Scale all to height of 3.125 inches (72 points per inch)
    var targetHeight = 3.125 * 72;
    for (var m = 0; m < resultPaths.length; m++) {
        var item = resultPaths[m];
        var scaleFactor = (targetHeight / item.height) * 100;
        item.resize(scaleFactor, scaleFactor);
    }

    // Move the first four items to (0,0), (4,0), (0,4), (4,4)
    var positions = [
        [0, 0],
        [4 * 72, 0],
        [0, -4 * 72],
        [4 * 72, -4 * 72]
    ];

    for (var n = 0; n < Math.min(4, resultPaths.length); n++) {
        resultPaths[n].position = positions[n];
    }

    alert("Process complete!");
})();
