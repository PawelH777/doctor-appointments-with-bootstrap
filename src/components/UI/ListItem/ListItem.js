import React from 'react';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const listItem = (props) => {
    
    return(
        <Paper className={props.paperCss}>
            <ListItem 
                button={props.isButton}
                disabled={props.isDisabled}
                onClick={props.clicked}>
                <ListItemText 
                    primary={props.primary}
                    secondary={props.secondary}/>
            </ListItem>
        </Paper>
    );
}

export default listItem;