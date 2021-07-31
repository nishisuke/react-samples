package http

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"math/rand"

	"github.com/pusher/pusher-http-go/v5"
)

var messages = []string{
	"Hello! thank you visiting.",
	"How are you today?",
	"Feel free to comment!",
}

func ExecutionCount(w http.ResponseWriter, r *http.Request) {
	pusherClient := pusher.Client{
		AppID:   os.Getenv("PUSHER_APP_ID"),
		Key:     os.Getenv("PUSHER_KEY"),
		Secret:  os.Getenv("PUSHER_SECRET"),
		Cluster: os.Getenv("PUSHER_CLUSTER"),
	}

	time.Sleep(time.Second * time.Duration(rand.Intn(5)+5))
	data := map[string]string{"message": messages[rand.Intn(3)]}
	err := pusherClient.Trigger("my-channel", "my-event", data)
	if err != nil {
		panic(err)
	}

	time.Sleep(time.Second * time.Duration(20))
	data = map[string]string{"message": messages[rand.Intn(3)]}
	err = pusherClient.Trigger("my-channel", "my-event", data)
	if err != nil {
		panic(err)
	}

	fmt.Fprint(w, "OK")
}
