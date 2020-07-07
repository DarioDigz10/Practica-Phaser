package es.urjc.code.juegosenred;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/items")
public class ItemsController {
  Map<Long, Item> items = new ConcurrentHashMap<>();
  AtomicLong nextId = new AtomicLong(0);

  ArrayList<User> jugadores = new ArrayList<User>();
  ArrayList<Chat> chats = new ArrayList<Chat>();

  @GetMapping("/user")
  public ArrayList<User> users() {
    return jugadores;
  }

  @GetMapping("/chat")
  public ArrayList<Chat> chats() {
    return chats;
  }

  @PostMapping("/verchat")
  @ResponseStatus(HttpStatus.CREATED)
  public ArrayList<Chat> actualizarChat(@RequestBody User user) {
    for (int i = 0; i < jugadores.size(); i++) {
      if (jugadores.get(i).name.equals(user.name)) {
        jugadores.get(i).contadorMensajes = 0;
      } else {
        jugadores.get(i).contadorMensajes++;
      }
      if (jugadores.get(i).contadorMensajes >= 10) {
        Chat chatSistema = new Chat();
        chatSistema.usuario = "Sistema";
        chatSistema.texto =
          "The user " + jugadores.get(i).name + " has disconnected";

        chats.add(chatSistema);
        jugadores.remove(i);
        i--;
      }
    }

    return chats;
  }

  @PostMapping("/chat")
  @ResponseStatus(HttpStatus.CREATED)
  public Chat nuevoChat(@RequestBody Chat c) {
    if (c.texto != "") {
      chats.add(c);
    }

    return c;
  }

  @PostMapping("/user")
  @ResponseStatus(HttpStatus.CREATED)
  public User nuevoUsuario(@RequestBody User user) {
    long id = nextId.incrementAndGet();
    user.id = (int) id;

    jugadores.add(user);

    Chat chatSistema = new Chat();
    chatSistema.usuario = "Sistema";
    chatSistema.texto = "The user " + user.name + " has connected";

    chats.add(chatSistema);

    return user;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Item nuevoItem(@RequestBody Item item) {
    long id = nextId.incrementAndGet();
    item.setId(id);
    items.put(id, item);

    return item;
  }

  @PutMapping("/{id}")
  public ResponseEntity<Item> actulizaItem(
    @PathVariable long id,
    @RequestBody Item itemActualizado
  ) {
    Item savedItem = items.get(itemActualizado.getId());

    if (savedItem != null) {
      items.put(id, itemActualizado);

      return new ResponseEntity<>(itemActualizado, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Item> getItem(@PathVariable long id) {
    Item savedItem = items.get(id);

    if (savedItem != null) {
      return new ResponseEntity<>(savedItem, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Item> borraItem(@PathVariable long id) {
    Item savedItem = items.get(id);

    if (savedItem != null) {
      items.remove(savedItem.getId());
      return new ResponseEntity<>(savedItem, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
