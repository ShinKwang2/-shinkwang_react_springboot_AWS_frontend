import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
        this.update = props.update; // update 를 this.update 에 할당
    }

    //함수 추가
    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    // readOnly 관련 함수
    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly? ", this.state.readOnly)
        });
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true});
            this.update(this.state.item);   //엔터를 누르면 저장
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
        this.update(this.state.item);   //체크박스가 변경되면 저장
    }

    render() {
        const item = this.state.item
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase 
                        inputProps={{ 
                            "aria-label" : "naked",
                            readOnly: this.state.readOnly,
                        }}
                        type="text"
                        id={item.id}    // 각 리스트를 구분하려고 id를 연결
                        name={item.id}  // 각 리스트를 구분하려고 id를 연결
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton 
                    aria-label="Delete Todo"
                    onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

}

export default Todo;