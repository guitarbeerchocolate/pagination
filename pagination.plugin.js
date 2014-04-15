(function($)
{
    $.fn.extend(
    {
        pagination:function(options)
        {
            var defaults = 
            {
                showarrows:false,                
                classesext:null,
                alignment:'center'                
            }

            var options = $.extend(defaults, options);

            return this.each(function() 
            {
                var o = options;                

                var content = $(this).find('#content');
                var contentDivs = content.find(' > div');
                var firstDiv = content.children().first();
                var lastDiv = content.children().last();    
                var leftDiv = content.children().first();    
                var rightDiv = content.children().eq(1);
                var leftArrow, rightArrow;
                var activeDiv  = content.find('.active');
                var navigation = $(this).find('#navigation');                
                var contentArr = Array();

                contentDivs.not('.active').hide();

                /* Show the first arrows */
                if(o.showarrows == true)
                {
                  link = $(this).arrowlink(firstDiv.attr('id').replace(/ /g,''),'«', o.classesext);
                  navigation.append(link);
                  link = $(this).arrowlink(leftDiv.attr('id'),'<', o.classesext);
                  navigation.append(link);
                  leftArrow = $("#navigation a:contains('<')");
                }    

                /* Show all the pagination navigation */
                contentDivs.each(function()
                {
                  encodedID = $(this).attr('id').replace(/ /g,'');
                  $(this).attr('title', $(this).attr('id'));                  
                  $(this).attr('id', encodedID);                  
                  contentArr.push($(this).attr('id'));
                  link = $(this).buildlink(o.classesext);
                  navigation.append(link);
                });

                /* Show the last arrows */
                if(o.showarrows == true)
                {
                  link = $(this).arrowlink(rightDiv.attr('id'),'>', o.classesext);
                  navigation.append(link);
                  link = $(this).arrowlink(lastDiv.attr('id'),'»', o.classesext);
                  navigation.append(link);
                  rightArrow = $("#navigation a:contains('>')");
                }

                /* Centre the pagination navigation. May wish to set this as an option */
                navigation.css('text-align',o.alignment);

                /* Handle what happens when someone clicks on a navigation link */
                $(navigation).on('click', 'a', function()
                {
                  /* Make the currently clicked ID the active one */
                  activeDiv  = content.find('.active');
                  activeDiv.removeClass('active');
                  currentID = $(this).attr('href');
                  newActiveDiv = content.find(' > div'+currentID);
                  newActiveDiv.addClass('active');

                  /* Change what the arrows now point at */
                  if(o.showarrows == true)
                  {
                    leftArrow.updateleftlink(newActiveDiv, contentArr);
                    rightArrow.updaterightlink(newActiveDiv, contentArr);
                  }

                  /* Show the newly selected content */
                  contentDivs.not('.active').hide();
                  newActiveDiv.show();      
                });
            });
        }
    }); /* End of pagination plugin. Other function may go below this */

    /* Create the pagination navigation links */    
    $.fn.buildlink = function(classesext)
    {
        var ct = $.trim(classesext);
        link = '<a href="#';
        link += $(this).attr('id')+'"';        
        if(classesext !== null)
        {
            link += ' class="'+ct+'"';
        }
        link += '>';        
        link += $(this).attr('title');
        link += '</a>';
        return link;
    };

    $.fn.arrowlink = function(dynamicloc, linkchar, classesext)
    {
        var ct = $.trim(classesext);
        link = '<a href="#';        
        link += dynamicloc+'"';        
        link += ' class="pagarrow';
        if(classesext !== null)
        {
            link += ' '+ct;
        }        
        link += '">';
        link += linkchar;
        link += '</a>';
        return link;
    };

    /* Update the first arrow link */
    $.fn.updateleftlink = function(ad,cr)
    {
        var ov = 0;
        var hrefstring = '#';
        var ap = cr.indexOf(ad.attr('id'));
        if((ap-1) <= 0)
        {
            ov = 0;
        }
        else
        {
            ov = (ap-1);
        }
        hrefstring += cr[ov];
        $(this).attr('href',hrefstring);    
    };

    $.fn.updaterightlink = function(ad,cr)
    {
        var ov = 0;
        var hrefstring = '#';
        var ap = cr.indexOf(ad.attr('id'));    
        if((ap+1) >= cr.length)
        {
            ov = cr.length-1;      
        }
        else
        {
            ov = (ap+1);
        }
        hrefstring += cr[ov];    
        $(this).attr('href',hrefstring);    
    };

})(jQuery);
