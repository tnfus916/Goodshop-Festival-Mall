import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCodeModal = (props) => {
    const { onComplete } = props;

    const handleSearch = (data) => {
        console.log(data)
    }

    return (
        <>
            <DaumPostcode
                onComplete={onComplete}
                onSearch={handleSearch}
                autoClose
            />
        </>
    )
}

PostCodeModal.defaultProps = {
    style: {
        width: "700px",
        height: "450px",
    },
};

export default PostCodeModal