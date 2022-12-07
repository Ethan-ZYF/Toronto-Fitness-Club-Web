import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



export default function StandardImageList(props) {
    console.log("props", props);
    console.log(props.length)
    let itemData = [];
    props.map(
        (item) => {
            itemData.push({
                img: item,
                title: 'Image',
            })
            return
        }
    )
    console.log("itemData", itemData);
    return (
        <ImageList
            sx={{
                width: 500,
                height: 492,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
            }}
            cols={3}
            rowHeight={164}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
            {/* <h1>item</h1> */}
        </ImageList>
    );
}
